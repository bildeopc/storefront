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
      
      <div className="mb-4">
  <label
    htmlFor="OverallButtons"
    className="block text-sm font-medium text-gray-700 mb-2"
  >
    Overall:
  </label>
  <div id="OverallButtons" className="flex justify-between">
    <button
      className={`bg-${airesponse.Overall === 1 ? 'green' : 'gray'}-500 text-white font-bold py-2 px-4 rounded opacity-${airesponse.Overall >= 1 ? '100' : '50'} cursor-default`}
    >
      Good
    </button>
    <button
      className={`bg-${airesponse.Overall === 2 ? 'green' : 'gray'}-500 text-white font-bold py-2 px-4 rounded opacity-${airesponse.Overall >= 2 ? '100' : '50'} cursor-default`}
    >
      Better
    </button>
    <button
      className={`bg-${airesponse.Overall === 3 ? 'green' : 'gray'}-500 text-white font-bold py-2 px-4 rounded opacity-${airesponse.Overall >= 3 ? '100' : '50'} cursor-default`}
    >
      Best
    </button>
  </div>
</div>



      <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
          <span>Trash</span>
          <span>Medium</span>
          <span>Nice</span>
        </div>
      {Object.entries(airesponse).map(([key, value]) => {
        if (key !== "comments" && key !== "Overall") {
          if (value === 0) {
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
            );
          } else {
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
                  min="1"
                  max="3"
                  value={value}
                  onChange={(event) => handleSliderChange(key, event)}
                  disabled={key === "Overall"}
                />
              </div>
            );
          }
        }
      })}
    </div>
  );
  
    
}

export default Buildpc

