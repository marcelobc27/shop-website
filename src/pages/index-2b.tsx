//Option 2: fetch products on the client side (in UseEffect)
//from an internal API route

import Title from "@/components/Title";
import { getProducts } from "@/lib/products";
import Head from "next/head";
import { useEffect, useState } from "react";

type ProductProps = {
  id: number;
  title: string;
}[]

const HomePage = () => {
  const [products, setProducts] = useState<ProductProps>()

  useEffect(() => {
    (async () => {
      const response = await fetch('/api/products');
      const products = await response.json()
      setProducts(products)
    })()
  }, [])

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
          {products?.map((product) => (
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
