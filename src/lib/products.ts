import { fetchjson } from "./api";

const CMS_URL = process.env.CMS_URL
export interface ProductProps {
  id: number;
  title: string;
  description: string;
  price: number
}

function stripProducts(product: ProductProps){
  return {
    id: product.id,
    title: product.title,
    description: product.description,
    price: '$' + product.price.toFixed(2)
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