import Layout from "../../components/Layout";
import { wordpressGraphCMS } from "../../utils/fetchers";
import useSWR from "swr";
import Head from "next/head";

const getAllPostsQuery = `
  query {
    posts {
      nodes {
        slug
        databaseId
      }
    }
  }
`

export const getStaticPaths = async () => {
  const { posts } = await wordpressGraphCMS(getAllPostsQuery);

  return {
    paths: posts.nodes.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: true,
  }
};

export async function getStaticProps({ params }) {
  const { postBy } = await wordpressGraphCMS(
    `
      query {
        postBy(slug: "${params.slug}") {
          id,
          title,
          slug,
          content,
          featuredImage {
            node {
              sourceUrl,
              mediaItemUrl
            }
          }
        }
      }
    `
  )
  return {
    props: {
      post: postBy,
    },
  }
}

const ProductCard = ({ item }) => {
  const { title, content, featuredImage } = item;

  return (
    <div className="card bordered w-full min-h-5">
      <figure>
        <img src={featuredImage.node.sourceUrl} />
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

export default function Wordpress({ post }) {
  const { data, error } = useSWR(`
    query {
      postBy(slug: "${post?.slug}") {
        id,
        title,
        slug,
        content,
        featuredImage {
          node {
            sourceUrl,
            mediaItemUrl
          }
        }
      }
    }
  `, wordpressGraphCMS, {
    fallbackData: { postBy: post }
  })

  const item = data.postBy;

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
