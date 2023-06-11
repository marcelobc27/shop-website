import { fetchjson } from "./api";

const CMS_URL = process.env.CMS_URL
export interface ProductProps {
  id: number;
  title: string;
  description: string;
  price: number;
  picture: {
    url: string
  };
}

function stripProducts(product: ProductProps){
  return {
    id: product.id,
    title: product.title,
    description: product.description,
    price: '$' + product.price.toFixed(2),
    picture: { url: CMS_URL + product.picture.url } 
  }
}

export async function getProduct(id: number | undefined){
  const product = await fetchjson(`${CMS_URL}/products/${id}`)
  return stripProducts(product)
}

export async function getProducts(){
  const products = await fetchjson(`${CMS_URL}/products`)
  return products.map(stripProducts)
}