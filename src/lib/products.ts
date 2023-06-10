import { fetchjson } from "./api";

const CMS_URL = "http://localhost:1337"
export interface ProductProps {
  id: number;
  title: string;
  description: string;
}

function stripProducts(product: ProductProps){
  return {
    id: product.id,
    title: product.title,
    description: product.description
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