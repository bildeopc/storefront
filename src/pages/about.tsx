import Head from "@modules/common/components/head";
import { NextPageWithLayout } from "types/global";
import { ReactElement } from "react";
import Layout from "@modules/layout/templates";
import About from "@modules/about"


const AboutUs: NextPageWithLayout = () => {
  return (
    <>
      <Head title="About Us" />
      <About />
    </>
  )
}

AboutUs.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default AboutUs;

