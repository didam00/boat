import { getDataFromToken } from "@/helper/getDataFromToken";
import connect from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(req: NextRequest) {
  try {
    const userId = await getDataFromToken(req);
    const user = await User.findOne({_id: userId}).select("-password");
    
    return NextResponse.json({
      message: "User Found",
      data: user
    })
  } catch (error: any) {
    return NextResponse.json({
      error: error.message
    }, {
      status: 400
    })
  }
}