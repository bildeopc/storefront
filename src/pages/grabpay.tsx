import Head from "@modules/common/components/head"
import { NextPageWithLayout } from "types/global"
import { ReactElement } from "react"
import Layout from "@modules/layout/templates"
import Contact from "@modules/contact"

const Grabpay: NextPageWithLayout = () => {
  return (
    <>
      <Head title="Grab Pay Success" />
      <>
        <h1>Success</h1>
      </>
    </>
  )
}

Grabpay.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default Grabpay
