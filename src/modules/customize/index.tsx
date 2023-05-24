import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import { partsType, PartId } from "@modules/buildpc/partlist"
import PartSelector from "./PartSelector"
import PartsList from "./partslist"
import { useQueryParam, StringParam, withDefault } from "use-query-params"
import { formatVariantPrice, useCart } from "medusa-react"
import { useStore } from "@lib/context/store-context"

const PartsComponent = () => {
  const router = useRouter()
  // const { partlist } = router.query
  const { addItemMultiple } = useStore()

  const [partlist, setPartlist] = useQueryParam(
    "partlist",
    withDefault(StringParam, "")
  )

  const [parts, setParts] = useState<partsType[]>([])

  useEffect(() => {
    setParts(partlist ? JSON.parse(decodeURIComponent(partlist as string)) : [])
  }, [partlist])

  const modifyPartList = (parts: partsType[]) => {
    setPartlist(JSON.stringify(parts))
  }

  const [selectedPart, SetselectedPart] = useState<PartId>("CPU")

  const [isLoading, setIsLoading] = useState(false)

  const addPartListToCart = async () => {
    // Disable the button and show loading state
    setIsLoading(true)

    // add items
    await addItemMultiple(
      parts.map((part) => {
        if (part.variantID) {
          return { variantId: part.variantID, quantity: 1 }
        } else {
          return {
            variantId: "variant_01GY1ZVHXM4PR3P21B9TNN0B9V",
            quantity: 1,
          }
        }
      })
    )

    // Simulate an asynchronous operation for 12 seconds
    setTimeout(() => {
      // Enable the button and hide loading state
      setIsLoading(false)

      // Perform the actual action here, such as adding the part list to the cart
      router.push("/cart")
    }, 10000)
  }

  // Render the component with the parts data
  return (
    <>
      <div className="p-6">
        <h1 className="text-4xl font-bold mb-2">Customize your Build</h1>
        <p className="text-lg text-gray-500">
          Make minor adjustments to finalize your build.
        </p>
      </div>
      <div className="p-6 flex flex-wrap">
        <div className="w-full lg:w-1/2">
          <PartSelector
            parts={parts}
            SetselectedPart={SetselectedPart}
            selectedPart={selectedPart}
          />
        </div>
        <div className="w-full lg:w-1/2">
          <PartsList
            selectedPart={selectedPart}
            parts={parts}
            modifyPartList={modifyPartList}
          />
        </div>
      </div>
      <div className="p-6 flex justify-end">
        <button
          className="bg-gray-900 text-white py-2 px-4 rounded-md"
          onClick={addPartListToCart}
          disabled={isLoading} // Disable the button when loading is true
        >
          {isLoading ? "Loading..." : "Add to cart"}
        </button>
      </div>
    </>
  )
}

export default PartsComponent

// {parts.map((part, index) => (
//     <div key={index}>
//       <h3>{part.name}</h3>
//       <p>ID: {part.id}</p>
//       <p>Variant ID: {part.variantID}</p>
//       <p>Price: {part.price}</p>
//       {part.image && (
//         <Image src={part.image} alt={part.name} width={100} height={100} />
//       )}
//     </div>
//   ))}customize?partlist=%5B%7B"id"%3A"CPU"%2C"variantID"%3A"variant_01GY1ZVHXM4PR3P21B9TNN0B9V"%2C"name"%3A"Intel%20Core%20i3-10100"%2C"price"%3A33900%2C"image"%3A"https%3A%2F%2Fapi-minio.lawcloud.page%2Fmedusa%2F19-118-138-V11-550x550w-1681544169990.jpg"%7D%2C%7B"id"%3A"GPU"%2C"variantID"%3A"variant_01GY1Y0V1YXT9JCX6ZGWFNA4A8"%2C"name"%3A"Nvidia%20GTX%201650"%2C"price"%3A79900%2C"image"%3A"https%3A%2F%2Fapi-minio.lawcloud.page%2Fmedusa%2Fq9qcrfsypt27nqos_setting_xxx_0_90_end_2000-1681544696020.png"%7D%2C%7B"id"%3A"Storage%20size"%2C"variantID"%3A"variant_01GY1YZKXFK7P8RTBAK60F1587"%2C"name"%3A"256GB%20SSD"%2C"price"%3A9100%2C"image"%3A"https%3A%2F%2Fapi-minio.lawcloud.page%2Fmedusa%2FScreenshot%202023-04-15%20160056-1681545730641.png"%7D%2C%7B"id"%3A"PSU"%2C"variantID"%3A"variant_01GY1ZASKDJH36HKB3EBY8WF9S"%2C"name"%3A"500W%20PSU"%2C"price"%3A13700%2C"image"%3A"https%3A%2F%2Fapi-minio.lawcloud.page%2Fmedusa%2F71PB7DHGqcL._AC_SL1500_-1681546064898.jpg"%7D%2C%7B"id"%3A"RAM"%2C"variantID"%3A"variant_01GY1YFP6BTW67P7ZK0EF5K699"%2C"name"%3A"8GB%20DDR4"%2C"price"%3A7900%2C"image"%3A"https%3A%2F%2Fapi-minio.lawcloud.page%2Fmedusa%2Fdb84db5b0ec13562da900df132d06fc1-1681545168155.jpg"%7D%2C%7B"id"%3A"Mobo"%2C"variantID"%3A"variant_01GY1ZNGTR9DEHHF4HYPSHGF5C"%2C"name"%3A"MSI%20H310M%20PRO-VDH%20PLUS"%2C"price"%3A26800%2C"image"%3A"https%3A%2F%2Fapi-minio.lawcloud.page%2Fmedusa%2F1024-1681543837909.png"%7D%5D
