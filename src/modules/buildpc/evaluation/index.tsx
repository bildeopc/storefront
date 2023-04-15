import React, { useState } from "react"
import { AIresType } from "@modules/buildpc/partlist"

type BuildpcProps = {
  airesponse: AIresType
  setAiResData: React.Dispatch<React.SetStateAction<AIresType>>
}

const Buildpc = ({ airesponse, setAiResData }: BuildpcProps) => {
  const handleSliderChange = (
    key: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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
        if (key !== "comments")
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
                min="1"
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
