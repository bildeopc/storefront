import React, { useState } from "react"
import Evaluate from "@modules/buildpc/evaluation"
import Chat from "@modules/buildpc/chat"
import Partlist, { AIresType } from "@modules/buildpc/partlist"

const BuildPC = () => {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      message:
        "Hi there! Let me know what you want in your computer, and we'll get started creating the perfect one for you!",
    },
    // { sender: "user", message: "Hi! I have a question about my account." }
  ])

  const [aiResData, setAiResData] = useState<AIresType>({
    Overall: 1,
    CPU: 0,
    GPU: 0,
    "Storage size": 0,
    PSU: 0,
    RAM: 0,
    Mobo: 0,
    comments: "",
  })

  return (
    <>
      <div className="p-6">
        <h1 className="text-4xl font-bold mb-2">
          Build Your PC with the Help of Powerful AI
        </h1>
        <p className="text-lg text-gray-500">
          Create your dream PC with Lyra your companion.
        </p>
      </div>
      <div className="p-6 flex flex-wrap">
        <div className="w-full lg:w-1/4">
          <Chat
            messages={messages}
            setMessages={setMessages}
            setAiResData={setAiResData}
          />
        </div>
        <div className="w-full lg:w-3/4 flex flex-wrap">
          <div className="pt-10 lg:pt-0 w-full lg:w-1/2">
            <Evaluate airesponse={aiResData} setAiResData={setAiResData} />
          </div>
          <div className="w-full lg:w-1/2">
            <div className="w-full max-w-sm mx-auto ">
              <h2 className="text-xl font-bold mb-2">
                Your AI recommended build
              </h2>
              <Partlist airesponse={aiResData} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BuildPC
