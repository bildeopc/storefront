import React, { useState, useRef, useEffect } from "react"
import axios from "axios"
import { AIresType } from "@modules/partlist"

interface TextCompletionData {
  id: string
  object: string
  created: number
  model: string
  choices: TextCompletionChoice[]
  usage: TextCompletionUsage
}

interface TextCompletionChoice {
  text: string
  index: number
  logprobs: null
  finish_reason: string
}

interface TextCompletionUsage {
  prompt_tokens: number
  completion_tokens: number
  total_tokens: number
}

interface TextCompletionResponse {
  status: string
  message: string
  data: TextCompletionData
}

// Define the type for the `messages` prop
type Message = {
  sender: string
  message: string
}

// Define the type for the `props` object
type ChatProps = {
  messages: Message[]
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
  setAiResData: React.Dispatch<React.SetStateAction<AIresType>>
}

const Chat = ({ messages, setMessages, setAiResData }: ChatProps) => {
  const chatContainerRef = useRef<HTMLInputElement>(null)

  const [isButtonDisabled, setIsButtonDisabled] = useState(false)

  // prevent user abuse

  const handleButtonClick = () => {
    // Disable the button when clicked
    setIsButtonDisabled(true)
    // Set a timeout of 30 seconds to re-enable the button
    setTimeout(() => {
      setIsButtonDisabled(false)
    }, 30000)
  }

  useEffect(() => {
    // Check if the button was previously disabled within the last 30 seconds
    const lastDisabledTime = localStorage.getItem("lastDisabledTime")
    if (lastDisabledTime) {
      const currentTime = new Date().getTime()
      const timeDifference = currentTime - parseInt(lastDisabledTime)
      // If the time difference is less than 30 seconds, disable the button
      if (timeDifference < 30000) {
        setIsButtonDisabled(true)
      }
    }
  }, [])

  useEffect(() => {
    // Update the last disabled time in localStorage when the button is disabled
    if (isButtonDisabled) {
      localStorage.setItem("lastDisabledTime", new Date().getTime().toString())
    } else {
      localStorage.removeItem("lastDisabledTime")
    }
  }, [isButtonDisabled])

  //

  const handleSendMessage = (message: string) => {
    // disable button and prevent abuse
    handleButtonClick()
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", message },
    ])
    // Simulate AI's response after 1 second
    // setTimeout(() => {
    //   setMessages((prevMessages) => [
    //     ...prevMessages,
    //     { sender: "ai", message: "Sure, what's your question?" }
    //   ]);
    // }, 1000);

    // prompt
    const data = {
      prompt: `act as a computer suggester system and print out the evaluation below. choose 1 or 2 or 3
      question: ${message}
      Evaluation (reply in JSON format)
      1=low,2=med,3=high
      CPU:1,2,3
      GPU:1,2,3
      Storage size:1,2,3
      PSU:1,2,3
      RAM;1,2,3
      comments: (text)`,
    }

    axios
      .post("/api/openapi", data)
      .then((response) => {
        console.log("Response:", response.data)
        const responseData: TextCompletionResponse = response.data

        const responseObject = JSON.parse(responseData.data.choices[0].text)

        setAiResData(responseObject)

        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "ai", message: responseObject?.comments },
        ])
      })
      .catch((error) => {
        console.error("Error:", error)
        // Handle any errors that occurred during the request
      })
  }

  useEffect(() => {
    // Scroll to the bottom of the chat container when new messages are added
    const chatContainer = chatContainerRef.current
    if (chatContainer) chatContainer.scrollTop = chatContainer.scrollHeight
  }, [messages])

  return (
    <div className="w-full max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-2">Your AI companion</h2>
      <div className="bg-white rounded-lg shadow-md p-4">
        <div ref={chatContainerRef} className="h-80 overflow-y-auto mb-4">
          {messages.map((msg, index) => (
            <div key={index} className="flex flex-col mb-2">
              <span
                className={`text-sm font-bold ${
                  msg.sender === "user"
                    ? "text-right text-primary-600"
                    : "text-left text-gray-600"
                }`}
              >
                {msg.sender === "user" ? "You" : "AI"}
              </span>
              <span
                className={`${
                  msg.sender === "user"
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-700"
                } rounded-lg py-2 px-3 mt-1 text-sm break-words`}
              >
                {msg.message}
              </span>
            </div>
          ))}
        </div>
        <form
          className="flex items-center"
          onSubmit={(e) => {
            e.preventDefault()
            const input = e.currentTarget.message
            if (input.value !== "") {
              handleSendMessage(input.value)
              input.value = ""
            }
          }}
        >
          <input
            type="text"
            name="message"
            placeholder="Type your message..."
            className="flex-grow rounded-full py-2 px-4 mr-2 focus:outline-none focus:ring w-full"
          />
          <button
            disabled={isButtonDisabled}
            type="submit"
            className={`bg-primary text-white px-4 py-2 rounded-full font-bold ${
              isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}

export default Chat
