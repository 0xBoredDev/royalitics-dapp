// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req;
  const { id } = query;
  //console.log(`id=${id}`);

  var config = {
    method: "get",
    url: `${process.env.NFTPORT_API_BASE}v0/solana/transactions/accounts/${id}?type=sale`,
    headers: { Authorization: "aeedcbbc-8cc3-4aaa-bf81-293c10391883" },
  };

  axios(config)
    .then(function (response) {
      res.status(200).json(response.data);
    })
    .catch(function (error) {
      //console.log(error.message);
      res.status(500).json({ message: error.message });
    });
}
