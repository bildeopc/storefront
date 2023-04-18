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
    // { sender: "user", message: "Hi! I have a question about my account." },
  ])
  const [aiResData, setAiResData] = useState<AIresType>({
    Overall: 3,
    CPU: 0,
    GPU: 0,
    "Storage size": 0,
    PSU: 0,
    RAM: 0,
    Mobo: 0,
    comments: "",
  })

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
      <div className="p-6 flex flex-wrap">
        <div className="w-full lg:w-1/4">
          {/*}Render the Chat component and pass in state variables to manage chat messages and AI response data*/}
          <Chat
            messages={messages}
            setMessages={setMessages}
            setAiResData={setAiResData}
          />
        </div>
        <div className="w-full lg:w-3/4 flex flex-wrap">
          <div className="pt-10 lg:pt-0 w-full lg:w-1/2">
            {/*Render the Evaluate component and pass in AI response data and state variable to manage AI response data*/}
            <Evaluate airesponse={aiResData} setAiResData={setAiResData} />
          </div>
          <div className="w-full lg:w-1/2">
            <div className="w-full max-w-sm lg:max-w-none mx-auto">
              <h2 className="text-xl font-bold mb-2">
                Personalized PC Build by Stella
              </h2>
              {/*Render the Partlist component and pass in AI response data*/}
              <Partlist airesponse={aiResData} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BuildPC
