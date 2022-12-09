import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query;
  console.log(slug);
  if (!slug || slug.length !== 2) {
    res
      .status(400)
      .json({
        message:
          "both update_authority and collection_symbol must be provided",
      });
  }

  let updateauthority = slug[0] as string;
  let collectionsymbol = slug[1] as string;  

  var apikey = "0dec5037-f67d-4da8-9eb6-97e2a09ffe9a";
  var url = `${
    process.env.CORAL_CUBE_API_BASE
  }${apikey}/inspector/getMintActivities?update_authority=${updateauthority}&collection_symbol=${collectionsymbol}
  )}`;

  var request = {
    method: "get",
    url: url,
    headers: { Accept: "application/json" },
  };

  try {
    let results = await axios(request);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default handler;
