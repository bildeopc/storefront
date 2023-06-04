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
              ? "border-primary border-4 border-solid flex flex-col items-center justify-center"
              : "flex flex-col items-center justify-center border-4 border-white border-solid"
          }
          onClick={() => SetselectedPart(part.id)}
        >
          <div className="flex flex-row items-center justify-between w-full px-20">
            <div className="w-100">
              <PartName id={part.id} />
            </div>
            <div className="w-[250px] flex flex-row items-center justify-center">
              <Image
                src={(part.image && part.image) || ""}
                alt={part.name}
                width={60}
                height={60}
              />
              <div>
                <p>{part.name}</p>
                <p>RM{part.price}</p>
              </div>
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
