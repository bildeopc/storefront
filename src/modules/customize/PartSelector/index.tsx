import React from "react"
import Image from "next/image"
import { partsType, PartId } from "@modules/buildpc/partlist"

interface PartNameProps {
  id: PartId
}

interface PartSelectorProps {
  parts: partsType[]
  SetselectedPart: Function
  selectedPart: PartId
}

const PartSelector: React.FC<PartSelectorProps> = ({
  parts,
  selectedPart,
  SetselectedPart,
}) => {
  return (
    <>
      {parts.map((part) => (
        <div
          key={part.id}
          className={
            selectedPart === part.id
              ? "outline-primary flex flex-col items-center justify-center"
              : "flex flex-col items-center justify-center"
          }
          onClick={() => SetselectedPart(part.id)}
        >
          <div className="flex items-center">
            <Image
              className="w-12 h-12 mr-4"
              src={(part.image && part.image) || ""}
              alt={part.name}
              width={100}
              height={100}
            />
            <div>
              <PartName id={part.id} />
              <p>{part.name}</p>
              <p>RM{part.price}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

const PartName: React.FC<PartNameProps> = ({ id }) => {
  const partMap = {
    CPU: "Processor",
    GPU: "Graphics Card",
    "Storage size": "Size of Storage",
    PSU: "Power Supply",
    RAM: "RAM",
    Mobo: "Motherboard",
  }

  return <p className="font-bold">{partMap[id]}</p>
}

export default PartSelector
