import Head from "@modules/common/components/head"
import { NextPageWithLayout } from "types/global"
import { ReactElement } from "react"
import Layout from "@modules/layout/templates"
import Support from "@modules/Support"
import Contact from "@modules/contact"

const SupportContact: NextPageWithLayout = () => {
  return (
    <>
      <Head title="Support" />
      <Support />
      <hr />
      <Contact />
    </>
  )
}

SupportContact.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default SupportContact
