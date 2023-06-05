import React from "react"
import Image from "next/image"
import { partsType, PartId } from "@modules/buildpc/partlist"

interface PartNameProps {
  id: PartId
}

interface PartSelectorProps {
  parts: partsType[]
  SetselectedPart: Function
  selectedPart: PartId | "None"
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
              ? "border-primary border-4 border-solid flex flex-col items-center justify-center rounded-md hover:bg-gray-100 transition duration-200 ease-in-out"
              : "flex flex-col items-center justify-center border-4 border-white border-solid hover:border-gray-300 hover:bg-gray-100 rounded-lg transition duration-200 ease-in-out"
          }
          onClick={() =>
            SetselectedPart(selectedPart === part.id ? "None" : part.id)
          }
        >
          <div className="flex flex-row items-center justify-between w-full ">
            <div className="w-100 pl-1">
              <PartName id={part.id} />
            </div>
            <div className="py-2 w-[270px] flex flex-row items-center justify-start">
              <div className="flex flex-row justify-center">
                <div className="w-20">
                  <Image
                    src={(part.image && part.image) || ""}
                    alt={part.name}
                    width={60}
                    height={60}
                  />
                </div>
              </div>
              <div className="pr-2">
                <p className="text-lg font-semibold whitespace-nowrap w-[180px] text-ellipsis overflow-hidden hover:overflow-visible transition duration-200 ease-in-out">
                  {part.name}
                </p>
                {part.price ? (
                  <p className="text-gray-500">
                    RM {(part.price / 100).toFixed(2)}
                  </p>
                ) : (
                  <p>Price Error</p>
                )}
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
