/* eslint-disable prefer-const */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import supabaseServer from "@/utils/supabaseServer";
import { v4 as uuidv4 } from "uuid";

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
    .from("users")
    .select("nonce")
    .eq("address", address);

  // console.log(`data in nonceApi: ${JSON.stringify(data)}`);
  // check if this address already exists in the database

  if (data.length > 0) {
    // if it does, update the nonce
    let { data, error } = await supabaseServer
      .from("users")
      .update({ nonce })
      .eq("address", address);
    // .eq("address", address)
  } else {
    let { data, error } = await supabaseServer.from("users").insert({
      address,
      nonce,
    });
  }

  if (error) {
    // console.log(`error in nonceApi: ${error}`);
    res.status(500).json({ error: error.message });
    return;
  } else {
    // console.log(`no error in nonceApi`);
    res.status(200).json({ nonce: nonce });
    return;
  }
};

export default nonceApi;
