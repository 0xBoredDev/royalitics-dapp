import type { NextApiRequest, NextApiResponse } from 'next'
import { collections } from "../../data/collections";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json(collections);
}