import connect from "@/lib/db";
import Forms from "@/models/Forms"
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(req: NextRequest) {
  const voteId = req.url.split("/").at(-1);

  const form = await Forms.findOne({ _id: voteId }).populate("questions");

  if (!form) {
    return NextResponse.json({
      message: "Form not Found"
    }, {
      status: 404
    })
  }

  return NextResponse.json({
    message: "Form Found",
    data: form
  })
}