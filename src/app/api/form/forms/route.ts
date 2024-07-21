import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/db";
import Forms from "@/models/Forms"

connect();

export async function GET(req: NextRequest) {
  try {
    const forms = await Forms.find({isPublic: true}).select("-questions");
    
    return NextResponse.json({
      message: "Forms Found",
      data: forms
    })
  } catch (error: any) {
    return NextResponse.json({
      error: error.message
    }, {
      status: 400
    })
  }
}
