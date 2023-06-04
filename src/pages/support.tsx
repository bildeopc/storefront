import Head from "@modules/common/components/head"
import { NextPageWithLayout } from "types/global"
import { ReactElement } from "react"
import Layout from "@modules/layout/templates"
import Support from "@modules/Support"

const BNPL: NextPageWithLayout = () => {
  return (
    <>
      <Head title="Support" />
      <Support />
    </>
  )
}

BNPL.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default BNPL
