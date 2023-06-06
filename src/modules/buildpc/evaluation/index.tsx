import React, { useState } from "react"
import { AIresType } from "@modules/buildpc/partlist"

const PartIdLabels: Record<string, string> = {
  CPU: "Processor",
  GPU: "Graphics Card",
  "Storage size": "Storage Size",
  PSU: "Power Supply",
  RAM: "Memory",
  Mobo: "Motherboard",
}

// Define the BuildpcProps type, which specifies the props passed to the Buildpc component
type BuildpcProps = {
  airesponse: AIresType // A prop of type AIresType that stores the AI's response data
  setAiResData: React.Dispatch<React.SetStateAction<AIresType>> // A function that updates the aiResData state
}

// Define the Buildpc component, which displays a form for users to input their desired PC specifications
const Buildpc = ({ airesponse, setAiResData }: BuildpcProps) => {
  // Define a handleSliderChange function that updates the aiResData state when the user adjusts a slider
  const handleSliderChange = (
    key: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // Update the aiResData state with the new slider value
    setAiResData((prevAiResData) => ({
      ...prevAiResData,
      [key]: Number(event.target.value),
    }))
  }

  return (
    <div className="p-4 pt-0 ">
      <h2 className="text-xl font-bold mb-2">Customize Your Recommendations</h2>
      <h3 className="text-sm mb-4">Refine Your Results</h3>

      <div className="flex justify-between text-sm font-medium text-gray-700 mb-5">
        <span className="text-sm font-bold text-gray-700">Low</span>
        <span className="text-sm font-bold text-gray-700">Medium</span>
        <span className="text-sm font-bold text-gray-700">High</span>
      </div>
      {Object.entries(airesponse).map(([key, value]) => {
        // Check if the key is not "comments"
        if (key !== "comments") {
          // Check if the value is 0
          if (value === 0) {
            // If value is 0, render a disabled slider with 0.5 opacity
            return (
              <div className="mb-4" key={key}>
                <label
                  htmlFor={`${key}Slider`}
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {key}:
                </label>
                <input
                  type="range"
                  id={`${key}Slider`}
                  name={key}
                  className="slider accent-primary w-full"
                  min="0"
                  max="3"
                  value={value}
                  onChange={(event) => handleSliderChange(key, event)}
                  disabled={key === "Overall"}
                  style={{ opacity: 0.5 }}
                />
              </div>
            )
          } else {
            // If value is not 0, render a regular slider
            return (
              <div className="mb-4" key={key}>
                <label
                  htmlFor={`${key}Slider`}
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {PartIdLabels[key]}:
                </label>
                <input
                  type="range"
                  id={`${key}Slider`}
                  name={key}
                  className="slider accent-primary w-full"
                  min="1"
                  max="3"
                  value={value}
                  onChange={(event) => handleSliderChange(key, event)}
                  disabled={key === "Overall"}
                />
              </div>
            )
          }
        }
      })}
    </div>
  )
}

export default Buildpc
