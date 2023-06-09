//Option 2: fetch products on the client side (in UseEffect)

import Title from "@/components/Title";
import Head from "next/head";

const products = [
  { id: 1, title: "First Product" },
  { id: 2, title: "Second Product" },
]

const HomePage = () => {
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
