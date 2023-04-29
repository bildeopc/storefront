import Head from "@modules/common/components/head"
import { NextPageWithLayout } from "types/global"
import { ReactElement } from "react"
import Layout from "@modules/layout/templates"
import CustomizeModule from "@modules/customize"

const Customize: NextPageWithLayout = () => {
  return (
    <>
      <Head title="Customize" />
      <CustomizeModule />
    </>
  )
}

Customize.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default Customize
