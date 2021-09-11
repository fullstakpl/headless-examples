import Layout from "../../components/Layout";
import { wordpressGraphCMS } from "../../utils/fetchers";
import useSWR from "swr";
import Head from "next/head";
import Link from "next/link";

const getAllArticlesQuery = `
  query {
    posts {
      nodes {
        id
        title
        slug
        featuredImage {
          node {
            sourceUrl,
            mediaItemUrl
          }
        }
      }
    }
  }
`

export const getStaticProps = async () => {
  const { posts } = await wordpressGraphCMS(getAllArticlesQuery);

  return {
    props: {
      posts
    }
  }
};

const ArticleCard = ({ item }) => {
  const { title, featuredImage, slug } = item;

  return (
    <div className="card bordered w-2/6 min-h-3 p-2">
      <figure>
        <Link href={`/wordpress/${slug}`}>
          <a><img src={featuredImage.node.sourceUrl} className="" /></a>
        </Link>
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
      </div>
    </div>
  )
}

export default function Wordpress({ posts }) {
  const { data, error } = useSWR(getAllArticlesQuery, wordpressGraphCMS, {
    fallbackData: { posts }
  })

  return (
    <Layout>
      <Head>
        <title>Wordpress integration</title>
      </Head>
      <div className="flex flex-wrap">
        {data.posts.nodes.map(article =>
          <ArticleCard item={article} key={article.id}/>
        )}
      </div>
    </Layout>
  )
}
