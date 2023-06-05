import Head from "@modules/common/components/head"
import { NextPageWithLayout } from "types/global"
import { ReactElement, useState, useEffect } from "react"
import Layout from "@modules/layout/templates"
import axios from "axios"

const Contact: NextPageWithLayout = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    setSuccess("")
  }, [name, email, message])

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    try {
      // Send form data to Discord webhook
      await axios.post(
        "https://discord.com/api/webhooks/1113002278970994791/J7nU-NpigdlZERcYzdYjzaUggF-oRc8YJ46UKwx9wNSEkR-DwnPTlPL6SwBs8aajHqEi",
        {
          username: "Contact Form",
          content: `New message from ${name} (${email}):\n\n${message}`,
        }
      )
      // Handle success, e.g., show a success message to the user

      setSuccess("Message sent successfully!")
    } catch (error) {
      // Handle error, e.g., show an error message to the user
      console.error("Error sending message:", error)
    }
  }

  return (
    <>
      <Head title="Contact" />
      <div className="container max-w-screen-lg  mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Contact Customer Support</h1>
        <p className="mb-4">
          If you have any questions or need assistance with your order, please
          fill out the form below and we will get back to you as soon as
          possible.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="border border-gray-300 rounded-md py-2 px-4 w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="border border-gray-300 rounded-md py-2 px-4 w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block font-medium mb-1">
              Message
            </label>
            <textarea
              id="message"
              className="border border-gray-300 rounded-md py-2 px-4 w-full h-32"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="flex flex-row items-center">
            <button
              type="submit"
              className="bg-primary text-white py-2 px-4 rounded-md hover:bg-white hover:text-primary  border-solid border-primary border-2"
            >
              Submit
            </button>
            {success.length > 0 && (
              <p className="ml-2 text-primary font-medium">{success}</p>
            )}
          </div>
        </form>
      </div>
    </>
  )
}

Contact.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default Contact
