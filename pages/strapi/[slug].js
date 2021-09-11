import Layout from "../../components/Layout";
import { strapiCMS } from "../../utils/fetchers";
import useSWR from "swr";
import Head from "next/head";

const getAllProductsQuery = `
  query {
    articles(sort: "created_at:desc", limit: 12) {
      permalink,
    }
  }
`

export const getStaticPaths = async () => {
  const { articles } = await strapiCMS(getAllProductsQuery);

  return {
    paths: articles.map(({ permalink }) => ({
      params: { slug: permalink },
    })),
    fallback: true,
  }
};

export async function getStaticProps({ params }) {
  const { articles } = await strapiCMS(
    `
      {
        articles(where: { permalink: "${params.slug}" }) {
          id,
          title,
          permalink,
          content,
          intro,
          cover {
            url
          }
        }
      }
    `
  )
  return {
    props: {
      article: articles[0],
    },
  }
}

const ProductCard = ({ item }) => {
  const { title, cover, description, price, content } = item;

  return (
    <div className="card bordered w-full min-h-5">
      <figure>
        <img src={`https://api.fullstak.pl/${cover.url}`} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {title}
        </h2>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  )
}

export default function GraphCMS({ article }) {
  const { data, error } = useSWR(`
    query {
      articles(where: { id: "${article?.id}" }) {
        id,
        title,
        permalink,
        intro,
        content,
        cover {
          url
        }
      }
    }
  `, strapiCMS, {
    fallbackData: { articles: [article] }
  })

  const [item] = data.articles;

  if(!item) {
    return <p>Loading</p>
  }

  return (
    <Layout>
      <Head>
        <title>{item.title}</title>
      </Head>
      <div className="flex flex-wrap">
        <ProductCard item={item} key={item.id}/>
      </div>
    </Layout>
  )
}
