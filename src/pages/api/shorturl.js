import { Configuration, OpenAIApi } from "openai"
import axios from "axios"
export default async function handler(req, res) {
  if (req.method === "POST") {
    // Process the POST request data as needed
    const data = req.body // Access the request body

    const username = process.env.URLSHORT_USERNAME
    const password = process.env.URLSHORT_PASSWORD

    const authHeader = `Basic ${Buffer.from(`${username}:${password}`).toString(
      "base64"
    )}`

    const apiUrl = `https://mypc.bildeopc.com/api/new?long=${data.url}&short=${data.short}`

    try {
      const response = await axios.post(
        apiUrl,
        {},
        {
          headers: {
            Authorization: authHeader,
          },
        }
      )

      // Handle the response data
      console.log(response.data)

      const jsonResponse = {
        status: "success",
        message: "POST request received",
        data: response.data,
      }

      // Send the JSON response
      res.status(200).json(jsonResponse)
    } catch (error) {
      // Handle the error
      console.error(error)
      res.status(500).json({ error: "Internal server error" })
    }
  } else {
    // Return an error for non-POST requests
    res.status(400).json({ error: "Invalid request method" })
  }
}
