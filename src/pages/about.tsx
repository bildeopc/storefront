import Head from "@modules/common/components/head"
import { NextPageWithLayout } from "types/global"
import { ReactElement } from "react"
import Layout from "@modules/layout/templates"

const About = () => {
  return (
    <>
      <Head title="About" />
      <h1>This is About</h1>
    </>
  )
}

About.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default About
