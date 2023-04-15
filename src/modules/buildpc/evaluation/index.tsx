import React, { useState } from "react"
import { AIresType } from "@modules/buildpc/partlist"

// Define the BuildpcProps type, which specifies the props passed to the Buildpc component
type BuildpcProps = {
  airesponse: AIresType    // A prop of type AIresType that stores the AI's response data
  setAiResData: React.Dispatch<React.SetStateAction<AIresType>>   // A function that updates the aiResData state
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
    <div className="w-full max-w-sm mx-auto p-4 pt-0">
      <h2 className="text-xl font-bold mb-2">Computer Evaluation</h2>
      <h3 className="text-sm mb-4">Fine tune your results</h3>
      {Object.entries(airesponse).map(([key, value]) => {
        // For each key-value pair in the airesponse object, check if the key is not "comments"
        if (key !== "comments")
          // If the key is not "comments", render a div with a label and a range input
          return (
            <div className="mb-4" key={key}>
              <label
                htmlFor={`${key}Slider`}
                className="block text-sm font-medium text-gray-700"
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
              />
            </div>
          )
      })}
    </div>
  )
}

export default Buildpc
