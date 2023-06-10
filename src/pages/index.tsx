//fetch products on the server side 
//with Incremental Static Regeneration (in GetStaticProps)

import Title from "@/components/Title";
import { getProducts } from "@/lib/products";
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";

interface ProductProps {
  products: Product[]
}

type Product = {
  id: number;
  title: string;
}

export const getStaticProps : GetStaticProps = async () => {
  console.log('[Homepage], getStaticProps()')
  const products = await getProducts()
  
  return{
    props: {
      products,
      revalidate: 10
    }
  }
}

const HomePage = ({products}: ProductProps) => {
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
          {products?.map((product) => (
            <li key={product.id}>
              <Link href={`/products/${product.id}`}>
                {product.title}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default HomePage;
