import { fetchjson } from "@/lib/api";
import { NextApiRequest, NextApiResponse } from "next";
import cookie from 'cookie'

const { CMS_URL } = process.env

async function handleLogin(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
  const { email, password } = req.body;
  try {
    const { jwt, user } = await fetchjson(`${CMS_URL}/auth/local`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        identifier: email,
        password,
      }),
    });
    res.status(200)
    .setHeader('Set-Cookie', cookie.serialize('jwt', jwt, {
      path: '/api',
      httpOnly: true
    }))
    .json({
      id: user.id,
      name: user.username,
    });
  } catch (error) {
    res.status(401).end();
  }
}

export default handleLogin;
