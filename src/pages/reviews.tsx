import Head from "@modules/common/components/head"
import { NextPageWithLayout } from "types/global"
import { ReactElement } from "react"
import Layout from "@modules/layout/templates"
import ReviewsPage from "@modules/reviews"

const Reviews: NextPageWithLayout = () => {
  return (
    <>
      <Head title="About Us" />
      <ReviewsPage />
    </>
  )
}

Reviews.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default Reviews
