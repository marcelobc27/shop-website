import Title from "@/components/Title";
import { ProductProps, getProduct, getProducts } from "@/lib/products";
import { GetStaticProps, NextPageContext } from "next";
import Head from "next/head";
import { title } from "process";

export async function getStaticPaths(){
  const products = await getProducts()
  return{
    paths: products.map((product: ProductProps) => ({
      params: {id: product.id.toString()}
    })),
    fallback: false,
  }
}

export const getStaticProps : GetStaticProps = async (context) => {
  const product = await getProduct(Number(context.params?.id))
  return{
    props: {
      ...product
    }
  }
}

function ProductPage({id, title, description} : ProductProps) {
  console.log(id, title, description)
  return (
    <>
      <Head>
        <title>Next Shop</title>
      </Head>
      <main className="px-6 py-4">
        <Title>{title}</Title>
        <p>
          {description}
        </p>
      </main>
    </>
  );
}

export default ProductPage;
