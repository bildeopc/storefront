import Head from "@modules/common/components/head";
import { NextPageWithLayout } from "types/global";
import { ReactElement } from "react";
import Layout from "@modules/layout/templates";
import PayLater from "@modules/paylater"

const BNPL: NextPageWithLayout = () => {
  return (
    <>
      <Head title="BuyNowPayLater" />
        <PayLater />
    </>
  )
}

BNPL.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default BNPL;