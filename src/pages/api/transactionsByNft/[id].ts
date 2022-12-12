// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
   const { query } = req;
   const { id } = query;
   //console.log(`id=${id}`)

   var config = {
      method: 'get',
      url: `${process.env.NFTPORT_API_BASE}v0/solana/transactions/nft/${id}?type=transfer`,      
      headers: { 'Authorization': '9d24a489-f88c-4f96-9014-b16fa3305dc2' }
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