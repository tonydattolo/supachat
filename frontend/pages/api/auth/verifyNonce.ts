/* eslint-disable prefer-const */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { verifyMessage } from "ethers/lib/utils";
import supabaseServer from "@/utils/supabaseServer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // console.log("in ethauth", JSON.stringify(req.body));
  const { address, signature, nonce } = req.body;
  const resolvedAddress = verifyMessage(nonce, signature);

  if (resolvedAddress !== address) {
    res.status(401).json({ error: "Invalid signature" });
    return;
  }

  let { data: user, error } = await supabaseServer
    .from("users")
    .select("*")
    .eq("address", address)
    .eq("nonce", nonce)
    .single();

  console.log("user in verifyNonce", user);

  const token = jwt.sign(
    {
      aud: "authenticated",
      exp: Math.floor(Date.now() / 1000 + 60 * 60 * 24 * 7 * 52),
      sub: user.address,
      user_metadata: {
        // id: user.id,
        address: user.address,
      },
      role: "authenticated",
      address: user.address,
    },
    process.env.SUPABASE_JWT_SECRET,
  );

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  } else {
    res.setHeader("Set-Cookie", [
      `supabaseToken=${token}; Path=/; Expires=${new Date(
        Date.now() + 60 * 60 * 24 * 7 * 52,
        // ).toUTCString()}; Secure; HttpOnly, SameSite=None`,
      ).toUTCString()};`,
    ]);
    res
      .status(200)
      .json({ user, message: "token set successfully serverside" });
  }
}
