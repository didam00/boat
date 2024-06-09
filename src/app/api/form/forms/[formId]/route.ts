import { NextApiRequest, NextApiResponse } from "next";
import connect from "@/lib/db";
import Forms from "@/models/Forms"

connect();

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { formId }
  } = req;

  try {
    const form = await Forms.findById(formId as string);
    if (!form) {
      return res.status(400).json({
        message: 'Form not found'
      });
    }
    return res.status(200).json(form)
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong"
    })
  }
}