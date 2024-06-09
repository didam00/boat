import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/db";
import Forms from "@/models/Forms"

connect();

export async function GET(req: any) {
  try {
    const voteId = req.query.voteId;
    const form = await Forms.findById(voteId);
    
    return NextResponse.json({
      message: "Forms Found",
      data: form
    })
  } catch (error: any) {
    return NextResponse.json({
      error: error.message
    }, {
      status: 400
    })
  }
}