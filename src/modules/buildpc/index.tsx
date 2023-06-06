import React, { useState } from "react"
import Evaluate from "@modules/buildpc/evaluation"
import Chat from "@modules/buildpc/chat"
import Partlist, { AIresType } from "@modules/buildpc/partlist"

const BuildPC = () => {
  // Initialize state variables to manage chat messages and AI response data
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      message:
        "Hi there! Let me know what you want in your computer, and we'll get started creating the perfect one for you!",
    },
    { sender: "user", message: "Hi! I have a question about my account." },
  ])
  const [aiResData, setAiResData] = useState<AIresType>({
    CPU: 0,
    GPU: 0,
    "Storage size": 0,
    PSU: 0,
    RAM: 0,
    Mobo: 0,
    comments: "",
  })

  const [customslider, setcustomslider] = useState(false)
  const handleToggle = () => {
    setcustomslider(!customslider)
  }
  // Render the Build PC page
  return (
    <>
      <div className="p-6">
        <h1 className="text-4xl font-bold mb-2">
          Build Your Perfect PC with the Assistance of AI
        </h1>
        <p className="text-lg text-gray-500">
          Craft the PC of your dreams with Stella as your trusty assistant.
        </p>
      </div>
      <div className="p-6 flex flex-col lg:flex-row justify-center">
        {messages.length > 1 ? (
          <div className="w-full">
            <div className="max-w-[450px] mx-auto ">
              <Chat
                messages={messages}
                setMessages={setMessages}
                setAiResData={setAiResData}
              />
              <div className="pb-10 pt-3 flex flex-row transition duration-200 ease-in">
                <input
                  type="checkbox"
                  className="toggle-checkbox block w-6 h-6 rounded-full bg-white border-4  cursor-pointer"
                  checked={customslider}
                  onClick={handleToggle}
                />
                <p className="ml-3">Advanced Adjustments</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full lg:w-1/2">
            {/*}Render the Chat component and pass in state variables to manage chat messages and AI response data*/}
            <Chat
              messages={messages}
              setMessages={setMessages}
              setAiResData={setAiResData}
            />
          </div>
        )}
        {messages.length > 1 && (
          <>
            {customslider && (
              <div className="pt-10 lg:pt-0 w-full px-2 ">
                <div className="max-w-[390px] mx-auto">
                  <Evaluate
                    airesponse={aiResData}
                    setAiResData={setAiResData}
                  />
                </div>
              </div>
            )}
            <div className="w-full">
              <div className="w-full ">
                <h2 className="text-xl font-bold mb-2">
                  Personalized PC Build by Stella
                </h2>
                {/*Render the Partlist component and pass in AI response data*/}
                <Partlist airesponse={aiResData} />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default BuildPC
