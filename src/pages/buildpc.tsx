import Head from "@modules/common/components/head";
import { NextPageWithLayout } from "types/global";
import { ReactElement } from "react";
import Layout from "@modules/layout/templates";
import Build from "@modules/buildpc"

const BuildPC: NextPageWithLayout = () => {
  return (
    <>
      <Head title="Build Your PC" />
      <Build />

    </>
  )
}

BuildPC.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default BuildPC;