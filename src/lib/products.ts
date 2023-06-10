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
  const response = await fetch(`http://localhost:1337/products/${id}`)
  const productResponse = await response.json()
  return stripProducts(productResponse)
}

export async function getProducts(){
  const response = await fetch('http://localhost:1337/products')
  const products = await response.json()
  return products.map(stripProducts)
}