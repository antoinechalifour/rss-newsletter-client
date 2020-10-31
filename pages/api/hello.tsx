import { NextApiHandler } from "next";

import { getUserName } from "@/foo";

const helloHandler: NextApiHandler = (req, res) => {
  res.statusCode = 200;
  res.json({ name: getUserName() });
};

export default helloHandler;
