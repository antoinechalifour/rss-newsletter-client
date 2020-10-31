import { NextApiHandler } from "next";

const helloHandler: NextApiHandler = (req, res) => {
  res.statusCode = 200;
  res.json({ name: "John Doe" });
};

export default helloHandler;
