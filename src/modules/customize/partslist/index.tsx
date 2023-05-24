import { partsType, PartId } from "@modules/buildpc/partlist"
import { useInfiniteQuery } from "@tanstack/react-query"
import { medusaClient } from "@lib/config"
import { useCart } from "medusa-react"
import { partList } from "@modules/buildpc/partlist"
interface PartSelectorProps {
  parts: partsType[]
  selectedPart: PartId
}

const PartsList: React.FC<PartSelectorProps> = ({ selectedPart, parts }) => {
  const { cart } = useCart()

  const fetchCollections = async (id: string) => {
    const { products, count, offset } = await medusaClient.products.list({
      limit: 12,
      offset: 0, //change if paged
      collection_id: [id],
      cart_id: cart?.id,
    })
  }

  return (
    <>
      <div>PartsList</div>
      <h1>{selectedPart}</h1>
      <h2>{JSON.stringify(parts.find((part) => part.id === selectedPart))}</h2>
    </>
  )
}
export default PartsList
