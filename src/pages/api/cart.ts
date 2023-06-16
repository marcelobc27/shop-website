import { fetchjson } from "@/lib/api";
import { NextApiRequest, NextApiResponse } from "next";

const { CMS_URL } = process.env

export interface CartItem {
  id: number;
  product: {
    id: number;
    title: string;
    price: number;
  },
  quantity: number;
  total: number
}

function stripCartItems(cartItem: CartItem){
  return {
    id: cartItem.id,
    product: {
      id: cartItem.product.id,
      title: cartItem.product.title,
      price: cartItem.product.price
    },
    quantity: cartItem.quantity
  }
}

async function handleCart(req: NextApiRequest, res: NextApiResponse) {
  const { jwt } = req.cookies;
  if(!jwt){
    res.status(401).end()
    return;
  }
  try{
    const cartItems = await fetchjson(`${CMS_URL}/cart-items`, {
      headers: { 'Authorization': `Bearer ${jwt}`}
    })
    res.status(200).json(cartItems.map(stripCartItems))
  } catch (err){
    res.status(401).end()
  }
}

export default handleCart;