import { NextApiRequest, NextApiResponse } from "next";

const deleteJwt = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("req.body", req.body);
  console.log("req.cookies", req.cookies);

  const { mytoken, supabaseToken } = req.cookies;
  if (!mytoken && !supabaseToken) {
    res.status(401).json({ error: "No token" });
    return;
  }

  res.setHeader("Set-Cookie", [
    `supabaseToken=; Path=/; Expires=${new Date(
      0,
    ).toUTCString()}; Secure; HttpOnly, SameSite=None`,
  ]);
  res.status(200).json({ message: "jwt deleted" });
};

export default deleteJwt;
