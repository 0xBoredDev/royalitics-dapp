// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
   const { query } = req;
   const { id } = query;

   var config = {
      method: 'get',
      url: `${process.env.MAGIC_EDEN_API_BASE}tokens/${id}`,      
      headers: { }
   };

   axios(config)
   .then(function (response) {      
      res.status(200).json(response.data.properties?.creators); 
   })
   .catch(function (error) {
      console.log(error.message);
      res.status(500).json(error.message);
   });
}