import { partsType, PartId } from "@modules/buildpc/partlist"
import { useInfiniteQuery } from "@tanstack/react-query"
import { medusaClient } from "@lib/config"
import { useCart } from "medusa-react"
import { partList } from "@modules/buildpc/partlist"
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query"
import Productitem from "../Productitem"
import { Product } from "types/medusa"

interface PartSelectorProps {
  parts: partsType[]
  selectedPart: PartId
  modifyPartList(partTypeArray: partsType[]): void
}

const PartsList: React.FC<PartSelectorProps> = ({
  selectedPart,
  parts,
  modifyPartList,
}) => {
  const { cart } = useCart()

  const fetchCollections = async (id: PartId) => {
    const { products, count, offset } = await medusaClient.products.list({
      limit: 12,
      offset: 0, //change if paged
      collection_id: [partList[id]],
      cart_id: cart?.id,
    })

    return {
      response: { products, count },
      nextPage: null,
    }
  }

  const {
    isLoading,
    isFetching,
    data: collectionList,
  } = useQuery(
    [`get_custom_collection`, selectedPart],
    () => fetchCollections(selectedPart),
    {
      keepPreviousData: true,
    }
  )

  const setParts = (product: Product) => {
    const newPartListItem = {
      id: selectedPart,
      variantID: product?.variants[0]?.id,
      name: product?.title,
      price: product?.variants[0]?.prices[0]?.amount,
      image: product?.thumbnail,
    }

    const modifiedArray = parts.map((item) => {
      if (item.id === newPartListItem.id) {
        return newPartListItem
      }
      return item
    })

    modifyPartList(modifiedArray)
  }

  const selectedpartObj = parts.find((part) => part.id === selectedPart)

  return (
    <>
      {!isFetching &&
        collectionList?.response.products.map((part) =>
          part.variants[0]?.id === selectedpartObj?.variantID ? (
            <></>
          ) : (
            <Productitem
              key={part.id}
              product={part as any}
              setParts={setParts}
            />
          )
        )}
    </>
  )
}
export default PartsList

{
  /* <ProductProvider  product={part}>
</ProductProvider> */
}
