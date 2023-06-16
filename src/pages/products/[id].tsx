import Page from "@/components/Page";
import { useUser } from "@/hooks/user";
import { ApiError } from "@/lib/api";
import { ProductProps, getProduct, getProducts } from "@/lib/products";
import { GetStaticPaths, GetStaticProps, NextPageContext } from "next";
import Image from "next/image";

export const getStaticPaths: GetStaticPaths = async () => {
  const products = await getProducts();
  return {
    paths: products.map((product: ProductProps) => ({
      params: { id: product.id.toString() },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const product = await getProduct(Number(context.params?.id));
    return {
      props: {
        ...product,
        revalidate: parseInt(String(process.env.REVALIDATE_SECONDS)),
      },
    };
  } catch (err) {
    if (err instanceof ApiError && err.cause === 404) {
      return { notFound: true };
    }
    throw err;
  }
};

function ProductPage(product: ProductProps) {
  const user = useUser()
  console.log("user in product page", user);

  return (
    <Page title={product.title}>
      <div className="flex flex-col lg:flex-row">
        <div>
          <Image src={product.picture.url} alt="" width={640} height={480} />
        </div>
        <div className="flex-1 lg:ml-4">
          <p className="text-sm">{product.description}</p>
          <p className="text-lg font-bold mt-2">{product.price}</p>
        </div>
      </div>
    </Page>
  );
}

export default ProductPage;
