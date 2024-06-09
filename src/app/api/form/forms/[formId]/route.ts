import { NextApiRequest, NextApiResponse } from "next";
import connect from "@/lib/db";
import Forms from "@/models/Forms"

connect();

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { voteId },
  } = req;

  const form = await Forms.findOne({ _id: voteId });
  if (!form) {
    return res.status(404).json({
      message: "Form not found"
    });
  }

  return res.status(200).json(form);
}