import React, { useState, useRef, useEffect } from "react"
import axios from "axios"
import { AIresType } from "@modules/buildpc/partlist"
import useAutoTextbox from "@lib/hooks/use-auto-textbox"
import styles from "./chat.module.css"

export interface TextCompletionData {
  id: string
  object: string
  created: number
  model: string
  choices: TextCompletionChoice[]
  usage: TextCompletionUsage
}

export interface TextCompletionChoice {
  text: string
  index: number
  logprobs: null
  finish_reason: string
}

export interface TextCompletionUsage {
  prompt_tokens: number
  completion_tokens: number
  total_tokens: number
}

export interface TextCompletionResponse {
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
  const [value, setValue] = useState("")
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  useAutoTextbox(textAreaRef.current, value)
  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = evt.target?.value

    setValue(val)
  }

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

  const handleSendMessage = (message: string) => {
    // disable button and prevent abuse
    handleButtonClick()
    setValue("")
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", message },
    ])
    // Simulate AI's response after 1 second
    // setTimeout(() => {
    //   setMessages((prevMessages) => [
    //     ...prevMessages,
    //     { sender: "ai", message: "Sure, what's your question?" },
    //   ])
    // }, 1000)

    // TODO: on/off switch for openapi
    // return null

    // prompt
    const data = {
      prompt: `act as a computer suggester system and only print out the evaluation below in JSON. only choose 1=low or 2=mid or 3=high. question:"${message}"must follow JSON format below:{"CPU":1,2,3"GPU":1,2,3"Storage size":1,2,3"PSU":1,2,3"RAM";1,2,3"Mobo":1,2,3"comments":"your explaination"}`,
    }

    // Send a POST request to the "/api/openapi" endpoint with the given data
    axios
      .post("/api/openapi", data)
      .then((response) => {
        // If the request is successful, log the response data to the console
        console.log("Response:", response.data)

        // Parse the response data as a TextCompletionResponse object
        const responseData: TextCompletionResponse = response.data

        // Parse the text of the first choice in the response data's choices array as a JSON object
        const responseObject = JSON.parse(responseData.data.choices[0].text)

        // Set the AI response data state to the parsed JSON object
        setAiResData(responseObject)

        // Add a new message object to the messages state, with "ai" as the sender and the parsed comments as the message text
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "ai", message: responseObject?.comments },
        ])
      })
      .catch((error) => {
        // If there was an error with the request, log the error to the console
        console.error("Error:", error)
        // could add additional error handling code here
      })
  }

  useEffect(() => {
    // Scroll to the bottom of the chat container when new messages are added
    const chatContainer = chatContainerRef.current
    if (chatContainer) chatContainer.scrollTop = chatContainer.scrollHeight
  }, [messages])

  const handleTextareaKeyDown = (event: any) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      handleSendMessage(value)
    }
  }

  return (
    <div className="">
      <h2 className="text-xl font-bold mb-2">Your AI Sidekick</h2>
      <div className="bg-white rounded-lg shadow-md p-4">
        <div ref={chatContainerRef} className={styles.customscroll}>
          {messages.map((msg, index) => (
            <div key={index} className="flex flex-col mb-2">
              <span
                className={`text-sm font-bold ${
                  msg.sender === "user"
                    ? "text-right text-primary-600"
                    : "text-left text-gray-600"
                }`}
              >
                {msg.sender === "user" ? "You" : "Stella"}
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
          className="flex items-end"
          onSubmit={(e) => {
            // Prevent the default form submission behavior
            e.preventDefault()
            // Get the input element from the form
            const input = e.currentTarget.message
            // Check if the input value is not an empty string
            if (input.value !== "") {
              // Call the handleSendMessage function and pass it the input value
              handleSendMessage(input.value)
              // Clear the input element by setting its value to an empty string
              input.value = ""
            }
          }}
        >
          <textarea
            name="message"
            placeholder="Type your message..."
            onChange={handleChange}
            value={value}
            ref={textAreaRef}
            rows={1}
            onKeyDown={handleTextareaKeyDown}
            className="flex-grow rounded-md py-2 px-4 mr-2 focus:outline-none focus:ring w-full resize-none outline outline-gray-200 outline-1"
          />
          <button
            disabled={isButtonDisabled}
            type="submit"
            className={`bg-primary text-white px-4 py-2 rounded-md font-bold ${
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
