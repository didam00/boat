import Forms from "@/models/Forms";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const res = await Forms.countDocuments();

    return NextResponse.json({
      message: "Forms Found",
      data: res
    })
  } catch (err: any) {
    console.log(err);
  }
}