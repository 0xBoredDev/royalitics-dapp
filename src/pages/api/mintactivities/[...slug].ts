import type { NextApiRequest, NextApiResponse } from 'next';
import axios from "axios";
import moment from "moment"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {   
   const { slug } = req.query;
   if (!slug || slug.length < 2) {
      res.status(400).json({ message: 'both path parameters update_authority and collection_symbol must be provided' });      
   }

   
   let updateauthority = slug[0] as string;
   let collectionsymbol = slug[1] as string;      

   let days = '30';
   if(slug.length === 3) {
      days = slug[2] as string;      
   }

   //console.log(`updateauthority=${updateauthority}`);
   //console.log(`collectionsymbol=${collectionsymbol}`);

   var apikey = '0dec5037-f67d-4da8-9eb6-97e2a09ffe9a';
   var url = `${process.env.CORAL_CUBE_API_BASE}${apikey}/inspector/getMintActivities?update_authority=${updateauthority}&collection_symbol=${collectionsymbol}`;
   console.log(`url=${url}`)
   
   var config = {
      method: 'get',
      url: url,      
      headers: { 'Accept': 'application/json' }
   };  

   try {
      let results = await axios(config);
      var daysnumber: number = +days;
      let date_daysago = moment().utc().add(-daysnumber, 'days').format(); 
      console.log(`date_daysago=${date_daysago}`)

      let data = results.data.filter(item => {
         //console.log(`item.time=${item.time}`)
         let daysdiff = moment(item.time).diff(moment(date_daysago), 'days');
         //console.log(`daysfiff=${daysfiff}`)
         return daysdiff <= daysnumber
      });

      res.status(200).json(data);
   } catch (error) {
      res.status(500).json(error);
   }
}

export default handler

