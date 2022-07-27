/* eslint-disable prefer-const */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";
import supabase from "@/utils/supabase";
import { verifyMessage } from "ethers/lib/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // try {

  console.log("in ethauth", JSON.stringify(req.body));
  const { address, signature, nonce } = req.body;
  const resolvedAddress = verifyMessage(nonce, signature);

  if (resolvedAddress !== address) {
    // throw new Error("Invalid signature");
    res.status(401).json({ error: "Invalid signature" });
    return;
  }

  let { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("address", address)
    .eq("nonce", nonce)
    .single();

  console.log("user in verifyNonce", user);

  try {
    const token = jwt.sign(
      {
        aud: "authenticated",
        exp: Math.floor(Date.now() / 1000 + 60 * 60 * 24 * 7 * 52),
        sub: user.id,
        user_metadata: {
          id: user.id,
        },
      },
      process.env.SUPABASE_JWT_SECRET,
    );
  } catch (error) {
    throw new Error(error);
  }

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

  // } catch (error) {
  //   console.log(`error in ethauth: ${error}`);
  //   res.status(500).json({ error: error.message });
  //   return;
  // }

  // const token = jwt.sign({ address: address }, process.env.NEXT_PUBLIC_JWT_SECRET);
  // if (!token) {
  //   res.status(500).json({ error: "failed to generate token" });
  //   return;
  // }

  // try {
  //   Cookies.set("mytoken", `${token}`, {
  //     expires: new Date(Date.now() + 60 * 60 * 24 * 7 * 52),
  //     path: "/",
  //     // httpOnly: true,
  //     // sameSite: "strict",
  //     // secure: process.env.NODE_ENV === "production",
  //   });
  //   res.status(200).json({ message: "success" });
  // } catch (error) {
  //   console.log(error);
  // }

  // // res.status(200).setHeader("Set-Cookie", [
  // //   `mytoken=${token}; path=/; max-age=${60 * 60 * 24 * 7 * 52}`,
  // // ])

  // const { user } = supabase.auth.setAuth(Cookies.get("mytoken"));

  // if (!user) {
  //   res.status(401).json({ error: "failed to authenticate" });
  //   return;
  // }

  // res.status(200).json({ user });
}
