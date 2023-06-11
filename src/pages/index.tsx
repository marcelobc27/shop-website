//fetch products on the server side 
//with Incremental Static Regeneration (in GetStaticProps)

import ProductCard from "@/components/ProductCard";
import Title from "@/components/Title";
import { ProductProps, getProducts } from "@/lib/products";
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";

// interface ProductProps {
//   products: Product[]
// }

type Products = {
  products: ProductProps[]
}

export const getStaticProps : GetStaticProps = async () => {
  console.log('[Homepage], getStaticProps()')
  const products = await getProducts()
  
  return{
    props: {
      products,
      revalidate: parseInt(String(process.env.REVALIDATE_SECONDS))
    }
  }
}

const HomePage = ({products}: Products) => {
  console.log("Chegou aqui", products)
  return (
    <>
      <Head>
        <title>Next-Shop</title>
      </Head>
      <main className="px-6 py-4">
      <Title>
        Next Shop
      </Title>
        <ul>
          {products ? products.map((product: ProductProps) => (
            <li key={product.id}>
              <ProductCard {...product} />
            </li>
          )) : <h1>no products</h1>}
        </ul>
      </main>
    </>
  );
};

export default HomePage;
