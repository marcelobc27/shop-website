//Option 1: fetch products on the server side (in GetStaticProps)

import Title from "@/components/Title";
import { getProducts } from "@/lib/products";
import Head from "next/head";

interface ProductProps {
  products: Product[]
}

type Product = {
  id: number;
  title: string;
}

export async function getStaticProps(){
  console.log('[Homepage], getStaticProps()')
  const products = await getProducts()
  return { props: { products }};
}

const HomePage = ({products} : ProductProps) => {
  console.log(products)
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
          {products.map((product) => (
            <li key={product.id}>
              {product.title}
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default HomePage;
