import Title from "@/components/Title";
import { ProductProps, getProduct, getProducts } from "@/lib/products";
import { GetStaticPaths, GetStaticProps, NextPageContext } from "next";
import Head from "next/head";
import { title } from "process";

export const getStaticPaths: GetStaticPaths = async () => {
  const products = await getProducts()
  return{
    paths: products.map((product: ProductProps) => ({
      params: {id: product.id.toString()}
    })),
    fallback: "blocking",
  }
}

export const getStaticProps : GetStaticProps = async (context) => {
  try{
    const product = await getProduct(Number(context.params?.id))
    return{
      props: {
        ...product,
        revalidate: 10
      }
    }
  } catch(err) {
    return { notFound: true }
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
