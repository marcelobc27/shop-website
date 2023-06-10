import { getProducts } from "@/lib/products";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("[/api/products] handler")
  const products = await getProducts();
  res.status(200).json(products);
}

export default handler;
