import Layout from "../components/Layout";
import Head from "next/head";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Headless Examples</title>
      </Head>
      <h1 className="text-center text-2xl p-6">
        Sample Next.js integrations with GraphCMS, Strapi and Wordpress
      </h1>
    </Layout>
  )
}
