/* eslint-disable prefer-const */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import supabaseServer from "@/utils/supabaseServer";
import { v4 as uuidv4 } from "uuid";
import User from "@/types/User";

// POST api/auth/nonce

// define type of NextApiRequest holding the user hex address as string
// type NextApiRequestWithAddress = NextApiRequest & {
//   body: {
//     address: string;
//   };
// };

// type NextApiResponseWithNonce = NextApiResponse & {
//   json: (data: { nonce: string }) => void;
// };

const nonceApi = async (req: NextApiRequest, res: NextApiResponse) => {
  // console.log('in nonceApi');

  console.log("req.body", req.body);

  const { address } = req.body;
  const nonce = uuidv4();

  let { data, error } = await supabaseServer
    .from<User>("users")
    .select("nonce")
    .eq("address", address);

  if (error) {
    console.log("error grabbing users", error);
    res.status(500).json({ error });
  }

  // check if user already exists. should return [] empty array if not
  if (data.length >= 0) {
    // if it does, update the nonce
    let { data, error } = await supabaseServer
      .from<User>("users")
      .update({ nonce })
      .eq("address", address);

    if (error) {
      console.log("error updating nonce for user", error);
      res.status(500).json({ error });
    }
  } else {
    // insert new user into the supabase database
    let { data, error } = await supabaseServer.from<User>("users").insert({
      address,
      nonce,
    });

    if (error) {
      console.log("error inserting new user", error);
      res.status(500).json({ error });
    }
  }

  if (error) {
    console.log(`error in nonceApi: ${error}`);
    res.status(500).json({ error: error.message });
    return;
  } else {
    res.status(200).json({ nonce: nonce });
    return;
  }
};

export default nonceApi;
