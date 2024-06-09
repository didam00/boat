import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/db";
import Forms from "@/models/Forms"

connect();

export async function GET(req: any) {
  try {
    // const formId = req.query.formId;
    const form = await Forms.findOne();
    console.log(req);
    
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