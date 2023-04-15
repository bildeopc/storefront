import React, { useState } from "react"
import Head from "@modules/common/components/head"
import { NextPageWithLayout } from "types/global"
import { ReactElement } from "react"
import Layout from "@modules/layout/templates"
import Buildpc from "@modules/buildpc"
import Chat from "@modules/chat"
import Partlist, { AIresType } from "@modules/partlist"

const BuildPC: NextPageWithLayout = () => {
  const [messages, setMessages] = useState([
    { sender: "ai", message: "Hello! How can I help you?" },
    // { sender: "user", message: "Hi! I have a question about my account." }
  ])

  const [aiResData, setAiResData] = useState<AIresType>({
    Overall: 1,
    CPU: 2,
    GPU: 1,
    "Storage size": 1,
    PSU: 1,
    RAM: 1,
    comments: "",
  })

  return (
    <>
      <Head title="Build Your PC" />
      <div className="p-6">
        <h1 className="text-4xl font-bold mb-2">
          Build Your PC with the power of AI
        </h1>
        <p className="text-lg text-gray-500">
          Create your dream PC with our helpful AI companion.
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
          <div className="w-full lg:w-1/2">
            <Buildpc airesponse={aiResData} setAiResData={setAiResData} />
          </div>
          <div className="w-full lg:w-1/2">
            <h2 className="text-xl font-bold mb-2">
              Your AI recommended build
            </h2>
            <Partlist airesponse={aiResData} />
          </div>
        </div>
      </div>
    </>
  )
}

BuildPC.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default BuildPC
