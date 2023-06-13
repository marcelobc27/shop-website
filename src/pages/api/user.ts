import { fetchjson } from "@/lib/api";
import { NextApiRequest, NextApiResponse } from "next";

const { CMS_URL } = process.env

async function handleUser(req: NextApiRequest, res: NextApiResponse) {
  const { jwt } = req.cookies;
  if(!jwt){
    res.status(401).end()
    return;
  }
  try{
    const user = await fetchjson(`${CMS_URL}/users/me`, {
      headers: { 'Authorization': `Bearer ${jwt}`}
    })
    res.status(200).json({
      id: user.id,
      name: user.username
    });
  } catch (err){
    res.status(401).end()
  }
}

export default handleUser;