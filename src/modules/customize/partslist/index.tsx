import { partsType, PartId } from "@modules/buildpc/partlist"

interface PartSelectorProps {
  parts: partsType[]
  selectedPart: PartId
}

const PartsList: React.FC<PartSelectorProps> = ({ selectedPart, parts }) => {
  return (
    <>
      <div>PartsList</div>
      <h1>{selectedPart}</h1>
      <h2>{JSON.stringify(parts.find((part) => part.id === selectedPart))}</h2>
    </>
  )
}
export default PartsList
