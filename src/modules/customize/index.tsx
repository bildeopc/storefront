import Image from "next/image"
import { useRouter } from "next/router"
import { partsType, PartId } from "@modules/buildpc/partlist"
import PartSelector from "./PartSelector"
import PartsList from "./partslist"
import { useState } from "react"

const PartsComponent = () => {
  const router = useRouter()
  const { partlist } = router.query

  // Parse the query string into an array of parts
  const parts: partsType[] = partlist
    ? JSON.parse(decodeURIComponent(partlist as string))
    : []

  const [selectedPart, SetselectedPart] = useState<PartId>("CPU")

  // Render the component with the parts data
  return (
    <>
      <div className="p-6">
        <h1 className="text-4xl font-bold mb-2">Customize your Build</h1>
        <p className="text-lg text-gray-500">
          Craft the PC of your dreams with Stella as your trusty assistant.
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
          <PartsList />
        </div>
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
//   ))}
