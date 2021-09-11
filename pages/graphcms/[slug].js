import Layout from "../../components/Layout";
import { graphCMS } from "../../utils/fetchers";
import useSWR from "swr";
import Head from "next/head";

const getAllProductsQuery = `
  query {
    products {
      id,
      name,
      description,
      price,
      slug,
      images {
        url
      }
    }
  }
`

export const getStaticPaths = async () => {
  const { products } = await graphCMS(getAllProductsQuery);

  return {
    paths: products.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: true,
  }
};

export async function getStaticProps({ params }) {
  const { products } = await graphCMS(
    `
      {
        products(where: { slug: "${params.slug}" }) {
          id,
          name,
          description,
          price,
          images {
            url
          }
        }
      }
    `
  )
  return {
    props: {
      product: products[0],
    },
  }
}

const ProductCard = ({ item }) => {
  const { name, images, description, price } = item;

  return (
    <div className="card bordered w-full min-h-5">
      <figure>
        <img src={images[0].url} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}
          <div className="badge mx-2 badge-secondary">{(price/100).toLocaleString('pl-PL', { style: 'currency', currency: 'EUR' })}</div>
        </h2>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default function GraphCMS({ product }) {
  const { data, error } = useSWR(`
    query {
      product(where: { id: "${product?.id}" }) {
        id,
        name,
        description,
        price,
        images {
          url
        }
      }
    }
  `, graphCMS, {
    fallbackData: { product }
  })

  if(!product) {
    return <p>Loading</p>
  }

  return (
    <Layout>
      <Head>
        <title>{product.name}</title>
      </Head>
      <div className="flex flex-wrap">
        <ProductCard item={data.product} key={product.id}/>
      </div>
    </Layout>
  )
}
