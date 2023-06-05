import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import { partsType, PartId } from "@modules/buildpc/partlist"
import PartSelector from "./PartSelector"
import PartsList from "./partslist"
import { useQueryParam, StringParam, withDefault } from "use-query-params"
import { useStore } from "@lib/context/store-context"
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar"
import axios from "axios"
import { TextCompletionResponse } from "@modules/buildpc/chat/index"
import "react-circular-progressbar/dist/styles.css"

interface AiResponseType {
  advise?: string
  compatibility?: boolean
  [key: string]: any
}

const PartsComponent = () => {
  const router = useRouter()
  // const { partlist } = router.query
  const { addItemMultiple } = useStore()

  const [partlist, setPartlist] = useQueryParam(
    "partlist",
    withDefault(StringParam, "")
  )

  const [parts, setParts] = useState<partsType[]>([])

  useEffect(() => {
    setParts(partlist ? JSON.parse(decodeURIComponent(partlist as string)) : [])
  }, [partlist])

  const modifyPartList = (parts: partsType[]) => {
    setPartlist(JSON.stringify(parts))
  }

  const [selectedPart, SetselectedPart] = useState<PartId | "None">("None")

  const [isLoading, setIsLoading] = useState(false)

  const [TotalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    // Calculate the total price whenever parts changes
    setTotalPrice(parts.reduce((total, part) => total + (part.price || 0), 0))
  }, [parts])

  const addPartListToCart = async () => {
    // Disable the button and show loading state
    setIsLoading(true)

    // add items
    await addItemMultiple(
      parts.map((part) => {
        if (part.variantID) {
          return { variantId: part.variantID, quantity: 1 }
        } else {
          // this is default item TODO: remove and display error rather default insert
          return {
            variantId: "variant_01GY1ZVHXM4PR3P21B9TNN0B9V",
            quantity: 1,
          }
        }
      })
    )

    // Simulate an asynchronous operation for 12 seconds
    setTimeout(() => {
      // Enable the button and hide loading state
      setIsLoading(false)

      // Perform the actual action here, such as adding the part list to the cart
      router.push("/cart")
    }, 10000)
  }

  const [gamelist, setGameList] = useState(["Valorant", "Cyberpunk 2077"])

  // {
  //   advise:
  //     "This system is capable of gaming, 3D modeling, and video editing. All the parts are compatible and should build a powerful machine. This system is capable of gaming, 3D modeling, and video editing. All the parts are compatible and should build a powerful machine.",
  //   compatibility: true,
  //   Valorant: 240,
  //   "Cyberpunk 2077": 120,
  // }

  const [AIresponse, setAIresponse] = useState<AiResponseType>({})
  const [isAILoading, setisAILoading] = useState(false)
  const [isAIClicked, setisAIClicked] = useState(false)

  const Airecomendation = async () => {
    setisAIClicked(true)
    setisAILoading(true)
    const data = {
      prompt: `I want you to act as a computer builder advisor. my first request is to examine this list and give the system capabilities of what it can do (ex.gaming,3D) and the part compatibilty in boolean. give estimate fps of the games below only numbers. you are only allowed to output in JSON
      list:${parts.map((part) => ({
        name: part.name,
        price: (part.price || 100 / 100).toFixed(2),
      }))}
       JSON format to follow:
      {
      "advise": "text",
      "compatibility":bool,
      ${gamelist.map((game) => `"${game}":number`)}
      }`,
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
        console.log("Response Object:", responseObject)

        setAIresponse(responseObject)
        setisAILoading(false)
      })
      .catch((error) => {
        // If there was an error with the request, log the error to the console
        console.error("Error:", error)
        // could add additional error handling code here
      })
  }

  function truncateText(text: string | undefined) {
    if (text) {
      const words = text.split(" ")

      if (words.length > 30) {
        const truncatedText = words.slice(0, 50).join(" ") + "..."
        return truncatedText
      }

      return text
    } else {
      return ""
    }
  }

  //random generator
  function generateRandomString(length: number) {
    const characters = "abcdefghijklmnopqrstuvwxyz"
    let randomString = ""

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length)
      randomString += characters.charAt(randomIndex)
    }

    return randomString
  }

  const [shareLink, setShareLink] = useState("")
  const [currentlongLink, setcurrentlongLink] = useState("")

  useEffect(() => {
    setShareLink("")
    setcurrentlongLink("")
  }, [partlist])

  const GenerateShareLink = async () => {
    if (currentlongLink === window.location.href) {
      navigator.clipboard.writeText(shareLink)
      return
    }

    const longurl = window.location.href

    const randomString = generateRandomString(5)

    const data = {
      url: longurl,
      short: randomString,
    }

    try {
      const response = await axios.post("/api/shorturl", data)

      console.log(response.data)

      if (response.data) {
        navigator.clipboard.writeText(
          `https://shorturl.lawcloud.page/${randomString}`
        )
        setShareLink(`https://shorturl.lawcloud.page/${randomString}`)
        setcurrentlongLink(longurl)
      } else {
        setShareLink("")
        setcurrentlongLink("")
      }
    } catch (error) {
      // Handle the error
      console.error(error)
    }
  }

  // Render the component with the parts data
  return (
    <>
      <div className="p-4 flex flex-row justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Customize your Build</h1>
          <p className="text-lg text-gray-500">
            Make minor adjustments to finalize your build.
          </p>
        </div>
        <div className="flex flex-col justify-center content-center pr-4">
          <div className="flex flex-row justify-items-end">
            <button
              className="mr-4 text-gray-900 transition duration-200 ease-in-out py-2 px-4 rounded-md hover:bg-gray-900 hover:text-white hover:border-gray-900 border-2 border-gray-900"
              onClick={() => {
                GenerateShareLink()
              }}
            >
              <svg
                className="w-5 h-5 inline-block mr-3"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  d="M14 5h-2v4H6v2H4v6h2v-2h6v4h2v-2h2v-2h2v-2h2v-2h-2V9h-2V7h-2V5z"
                  fill="currentColor"
                />
              </svg>
              {shareLink === "" ? "Share" : "Copied"}
            </button>

            <button
              className="bg-gray-900 text-white transition duration-200 ease-in-out py-2 px-4 rounded-md hover:bg-white hover:text-gray-900 hover:border-gray-900 border-2 border-gray-900"
              onClick={addPartListToCart}
              disabled={isLoading} // Disable the button when loading is true
            >
              <svg
                className="w-5 h-5 inline-block mr-3"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  d="M2 2h4v4h16v11H4V4H2V2zm4 13h14V8H6v7zm0 4h3v3H6v-3zm14 0h-3v3h3v-3z"
                  fill="currentColor"
                />
              </svg>
              {isLoading ? "Loading..." : "Add to cart"}
            </button>
          </div>
        </div>
      </div>
      <div className=" flex flex-wrap justify-evenly">
        <div className="p-3 flex flex-row">
          <div className="p-3 flex flex-col">
            <p className="pb-9 text-xl font-bold color-black text-center">
              Your Projected PC
            </p>
            <Image
              src={
                "https://cdn.discordapp.com/attachments/811231774327177326/1114944069517455420/redux-system-removebg-preview_x488.png"
              }
              alt="Desktop PC image"
              width={200}
              height={200}
            />
            <div className="flex flex-row justify-center pt-6">
              <div className="w-40">
                <CircularProgressbarWithChildren
                  value={TotalPrice / 100}
                  maxValue={10000}
                  minValue={0}
                  styles={buildStyles({
                    pathColor: `#6A67CE`,
                    textColor: "#6A67CE",
                    trailColor: "#d6d6d6",
                    backgroundColor: "#3e98c7",
                  })}
                >
                  <p className="text-xl font-bold text-primary">
                    RM {(TotalPrice / 100).toFixed(2)}
                  </p>
                  <p className="text-xs font-bold">Total Price</p>
                </CircularProgressbarWithChildren>
              </div>
            </div>
            <div className="pt-3 text-center">
              <p className="text-sm ">Build fee</p>
              <p className="text-xl font-bold text-primary">FREE!</p>
              <p className="text-sm ">Part costs</p>
              <p className="text-xl font-bold text-primary">
                RM {(TotalPrice / 100).toFixed(2)}
              </p>
            </div>
          </div>
          {selectedPart == "None" && (
            <div className="pl-7 pt-5 w-64">
              <div className="border-2 border-gray-200 rounded-lg p-3">
                <p className="text-lg font-bold">Stella says</p>
                <p className="text-sm text-gray-500 ">
                  {isAIClicked
                    ? !isAILoading
                      ? truncateText(AIresponse.advise)
                      : "I am thinking.."
                    : "click me to generate an AI-overview of your build"}
                </p>
              </div>
              <div className="relative">
                <div className="" style={triangleStyle}></div>
                <div className="" style={triangleAfterStyle}></div>
              </div>
              <div className="pt-6 w-100 flex flex-row justify-end ">
                <Image
                  src={
                    "https://cdn.discordapp.com/attachments/811231774327177326/1115225605663887380/image-removebg-preview_1.png"
                  }
                  alt="clippy"
                  className="cursor-pointer transition ease-in-out delay-150 scale-90 hover:scale-100 duration-300 "
                  width={120}
                  height={120}
                  onClick={() => Airecomendation()}
                />
              </div>
              {isAIClicked && !isAILoading && (
                <div className="p-3 px-3 mt-5 border-solid border-gray-200 border-2">
                  <p className="font-bold text-center pb-1 mb-4 border-solid border-gray-200  border-b-2">
                    AI-generated stats
                  </p>
                  <div className="pb-2 flex flex-row justify-center text-center">
                    <div className="flex flex-col justify-center">
                      <p className="font-semibold pr-2">Compatibility</p>
                    </div>
                    <div className="flex flex-col justify-center">
                      {AIresponse.compatibility ? (
                        <Image
                          src={
                            "https://cdn.discordapp.com/attachments/811231774327177326/1115293122377826344/vecteezy_check-mark-and-x-mark-icon-vector_5424885.jpg"
                          }
                          alt="check"
                          height={30}
                          width={30}
                        />
                      ) : (
                        <Image
                          src={
                            "https://cdn.discordapp.com/attachments/811231774327177326/1115293122008731679/xmark.jpg"
                          }
                          alt="check"
                          height={30}
                          width={30}
                        />
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col justify-center text-center">
                    {gamelist
                      .map((game) => ({
                        [game]: AIresponse[game],
                      }))
                      .map((game, index) => {
                        const gameName = Object.keys(game)[0]
                        const fps = Object.values(game)[0]

                        return (
                          <div
                            key={index}
                            className="flex flex-row justify-between text-center"
                          >
                            <p className="font-bold">{gameName}</p>
                            <p className="pl-2">{fps} fps</p>
                          </div>
                        )
                      })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="p-3 w-full lg:w-1/3 ">
          <h3 className="p-2 text-xl font-bold">Your Current Build</h3>
          <h3 className="pb-1 pl-2 text-sm font-bold">
            Select a part to replace
          </h3>
          <div className="p-3 min-w-min">
            <PartSelector
              parts={parts}
              SetselectedPart={SetselectedPart}
              selectedPart={selectedPart}
            />
          </div>
        </div>
        {selectedPart != "None" && (
          <div className="p-3 w-full lg:w-1/3">
            <h3 className="p-3 text-xl font-bold">Select a Part to replace</h3>
            <PartsList
              selectedPart={selectedPart}
              parts={parts}
              modifyPartList={modifyPartList}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default PartsComponent

const triangleStyle: React.CSSProperties = {
  position: "absolute",
  left: "auto",
  right: "30px",
  bottom: "-20px",
  border: "10px solid",
  borderColor: "#e5e7eb #e5e7eb transparent transparent",
}

const triangleAfterStyle: React.CSSProperties = {
  position: "absolute",
  left: "auto",
  right: "33px",
  bottom: "-13px",
  border: "8px solid",
  borderColor: "white white transparent transparent",
}

// {parts.map((part, index) => (
//     <div key={index}>
//       <h3>{part.name}</h3>
//       <p>ID: {part.id}</p>
//       <p>Variant ID: {part.variantID}</p>
//       <p>Price: {part.price}</p>
//       {part.image && (
//         <Image src={part.image} alt={part.name} width={100} height={100} />
//       )}
//     </div>
//   ))}customize?partlist=%5B%7B"id"%3A"CPU"%2C"variantID"%3A"variant_01GY1ZVHXM4PR3P21B9TNN0B9V"%2C"name"%3A"Intel%20Core%20i3-10100"%2C"price"%3A33900%2C"image"%3A"https%3A%2F%2Fapi-minio.lawcloud.page%2Fmedusa%2F19-118-138-V11-550x550w-1681544169990.jpg"%7D%2C%7B"id"%3A"GPU"%2C"variantID"%3A"variant_01GY1Y0V1YXT9JCX6ZGWFNA4A8"%2C"name"%3A"Nvidia%20GTX%201650"%2C"price"%3A79900%2C"image"%3A"https%3A%2F%2Fapi-minio.lawcloud.page%2Fmedusa%2Fq9qcrfsypt27nqos_setting_xxx_0_90_end_2000-1681544696020.png"%7D%2C%7B"id"%3A"Storage%20size"%2C"variantID"%3A"variant_01GY1YZKXFK7P8RTBAK60F1587"%2C"name"%3A"256GB%20SSD"%2C"price"%3A9100%2C"image"%3A"https%3A%2F%2Fapi-minio.lawcloud.page%2Fmedusa%2FScreenshot%202023-04-15%20160056-1681545730641.png"%7D%2C%7B"id"%3A"PSU"%2C"variantID"%3A"variant_01GY1ZASKDJH36HKB3EBY8WF9S"%2C"name"%3A"500W%20PSU"%2C"price"%3A13700%2C"image"%3A"https%3A%2F%2Fapi-minio.lawcloud.page%2Fmedusa%2F71PB7DHGqcL._AC_SL1500_-1681546064898.jpg"%7D%2C%7B"id"%3A"RAM"%2C"variantID"%3A"variant_01GY1YFP6BTW67P7ZK0EF5K699"%2C"name"%3A"8GB%20DDR4"%2C"price"%3A7900%2C"image"%3A"https%3A%2F%2Fapi-minio.lawcloud.page%2Fmedusa%2Fdb84db5b0ec13562da900df132d06fc1-1681545168155.jpg"%7D%2C%7B"id"%3A"Mobo"%2C"variantID"%3A"variant_01GY1ZNGTR9DEHHF4HYPSHGF5C"%2C"name"%3A"MSI%20H310M%20PRO-VDH%20PLUS"%2C"price"%3A26800%2C"image"%3A"https%3A%2F%2Fapi-minio.lawcloud.page%2Fmedusa%2F1024-1681543837909.png"%7D%5D
