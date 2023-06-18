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
  const [cooldownTime, setCooldownTime] = useState(0)
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const [value, setValue] = useState("")
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const [isTyping, setIsTyping] = useState(false)

  useAutoTextbox(textAreaRef.current, value)
  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = evt.target?.value
    setValue(val)
  }

  useEffect(() => {
    const storedCooldownTime = localStorage.getItem("cooldownTime")
    if (storedCooldownTime) {
      const storedTime = parseInt(storedCooldownTime)
      const remainingTime = storedTime - Date.now()

      if (remainingTime > 0) {
        setIsButtonDisabled(true)
        setCooldownTime(storedTime)
        startCooldownTimer(remainingTime)
      } else {
        localStorage.removeItem("cooldownTime")
      }
    }
  }, [])

  const startCooldownTimer = (duration: number) => {
    setTimeout(() => {
      setIsButtonDisabled(false)
      localStorage.removeItem("cooldownTime")
    }, duration)
  }

  const handleButtonClick = () => {
    const cooldownTime = Date.now() + 30000
    setIsButtonDisabled(true)
    setCooldownTime(cooldownTime)
    localStorage.setItem("cooldownTime", cooldownTime.toString())
    startCooldownTimer(30000)
  }

  const handleSendMessage = (message: string) => {
    // Check if the button is disabled
    if (isButtonDisabled) {
      // Return early if the button is still disabled
      return
    }

    handleButtonClick()
    setValue("")
    setIsTyping(true)
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", message },
    ])

    // Prompt
    const data = {
      prompt: `Act as a computer part suggester system. Question:"${message}" use JSON format and ratings from 1 (low) to 3 (high). 
      If the message is unrelated, must return all ratings as 0 and "comments":"",
      Else, dont rate 0, following the format: {"CPU":1,2,3"GPU":1,2,3"Storage size":1,2,3"PSU":1,2,3"RAM";1,2,3"Mobo":1,2,3"comments":"your explanation"}.`,
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

        // Check if the response object contains any comments
        if (responseObject.comments) {
          // Add a new message object to the messages state, with "ai" as the sender and the parsed comments as the message text
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "ai", message: responseObject.comments },
          ])
        } else {
          // Add a different message when the comments are not present
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              sender: "ai",
              message: "This message is not related to PCs or computers.",
            },
          ])
        }
      })
      .catch((error) => {
        // If there was an error with the request, log the error to the console
        console.error("Error:", error)
      })
      .finally(() => {
        setIsTyping(false)
      })

    // Set a timeout of 30 seconds to re-enable the button
    setTimeout(() => {
      setIsButtonDisabled(false)
    }, 30000)
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
        {isTyping && (
          <div className="flex items-center mt-1">
            <div className="mr-2 animate-bounce">
              <div className="h-2 w-2 bg-primary rounded-full"></div>
            </div>
            <span className="text-gray-500">Stella is typing...</span>
          </div>
        )}
        {isButtonDisabled && (
          <div
            className="flex items-center justify-center mt-4 text-gray-500"
            title="This is a cooldown to prevent abuse."
          >
            Please wait for 30 seconds before sending another message.
          </div>
        )}
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
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded-md font-bold"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}

export default Chat
