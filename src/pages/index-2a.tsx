//Option 2: fetch products on the client side (in UseEffect)
//directly from an external api

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
    getProducts().then(setProducts)
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
