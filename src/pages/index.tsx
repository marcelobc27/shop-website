//fetch products on the server side
//with Incremental Static Regeneration (in GetStaticProps)

import Page from "@/components/Page";
import ProductCard from "@/components/ProductCard";
import { ProductProps, getProducts } from "@/lib/products";
import { GetStaticProps } from "next";

type Products = {
  products: ProductProps[];
};

export const getStaticProps: GetStaticProps = async () => {
  const products = await getProducts();

  return {
    props: {
      products,
      revalidate: parseInt(String(process.env.REVALIDATE_SECONDS)),
    },
  };
};

const HomePage = ({ products }: Products) => {
  return (
    <Page title="Indoor Plants">
      <ul className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {products ? (
          products.map((product: ProductProps) => (
            <li key={product.id}>
              <ProductCard {...product} />
            </li>
          ))
        ) : (
          <h1>no products</h1>
        )}
      </ul>
    </Page>
  );
};

export default HomePage;
