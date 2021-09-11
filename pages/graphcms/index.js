import Layout from "../../components/Layout";
import Link from 'next/link';
import { graphCMS } from "../../utils/fetchers";
import useSWR from "swr";
import Head from "next/head";

const getAllProductsQuery = `
  query {
    products {
      id,
      name,
      slug
      description,
      price,
      images {
        url
      }
    }
  }
`

export const getStaticProps = async () => {
  const { products } = await graphCMS(getAllProductsQuery);

  return {
    props: {
      products
    }
  }
};

const ProductCard = ({ item }) => {
  const { name, images, description, price, slug } = item;

  return (
    <div className="card bordered w-2/6 min-h-5">
      <figure>
        <Link href={`/graphcms/${slug}`}>
          <a><img src={images[0].url} /></a>
        </Link>
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

export default function GraphCMS({ products }) {
  const { data, error } = useSWR(getAllProductsQuery, graphCMS, {
    fallbackData: { products }
  })

  return (
    <Layout>
      <Head>
        <title>GraphCMS integration</title>
      </Head>
      <div className="flex flex-wrap">
        {data.products.map(product =>
          <ProductCard item={product} key={product.id}/>
        )}
      </div>
    </Layout>
  )
}
