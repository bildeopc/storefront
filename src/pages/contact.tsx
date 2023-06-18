import Head from "@modules/common/components/head"
import { NextPageWithLayout } from "types/global"
import { ReactElement } from "react"
import Layout from "@modules/layout/templates"
import Contact from "@modules/contact"

const ContactUs: NextPageWithLayout = () => {
  return (
    <>
      <Head title="Contact Us" />
      <Contact />
    </>
  )
}

ContactUs.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default ContactUs
