import { Configuration, OpenAIApi } from "openai"

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Process the POST request data as needed
    const data = req.body // Access the request body

    // Create a JSON response
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    })

    const openai = new OpenAIApi(configuration)

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: data.prompt, // Use the 'prompt' field from the request body
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    })

    console.log(response.data)

    const jsonResponse = {
      status: "success",
      message: "POST request received",
      data: response.data,
    }

    // Send the JSON response
    res.status(200).json(jsonResponse)
  } else {
    // Return an error for non-POST requests
    res.status(400).json({ error: "Invalid request method" })
  }
}
