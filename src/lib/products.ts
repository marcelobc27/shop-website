interface ProductProps {
  id: number;
  title: string;
}

function stripProducts(product: ProductProps){
  return {
    id: product.id,
    title: product.title
  }
}

export async function getProducts(){
  const response = await fetch('http://localhost:1337/products')
  const products = await response.json()
  return products.map(stripProducts)
}