import Link from 'next/link';
import Layout from "../../components/Layout";
import { strapiCMS } from "../../utils/fetchers";
import useSWR from "swr";
import Head from "next/head";

const getAllArticlesQuery = `
  query {
    articles(sort: "created_at:desc", limit: 12) {
      id,
      title,
      intro,
      permalink,
      cover {
        url
      }
    }
  }
`

export const getStaticProps = async () => {
  const { articles } = await strapiCMS(getAllArticlesQuery);

  return {
    props: {
      articles
    }
  }
};

const ArticleCard = ({ item }) => {
  const { title, cover, intro, permalink } = item;

  return (
    <div className="card bordered w-2/6 min-h-5 p-2">
      <figure>
        <Link href={`/strapi/${permalink}`}>
          <a><img src={`https://api.fullstak.pl/${cover.url}`} /></a>
        </Link>
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{intro}</p>
      </div>
    </div>
  )
}

export default function GraphCMS({ articles }) {
  const { data, error } = useSWR(getAllArticlesQuery, strapiCMS, {
    fallbackData: { articles }
  })

  return (
    <Layout>
      <Head>
        <title>Strapi integration</title>
      </Head>
      <div className="flex flex-wrap">
        {data.articles.map(article =>
          <ArticleCard item={article} key={article.id}/>
        )}
      </div>
    </Layout>
  )
}
