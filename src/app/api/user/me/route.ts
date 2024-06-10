import { getDataFromToken } from "@/helper/getDataFromToken";
import connect from "@/lib/db";
import Users from "@/models/Users";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(req: NextRequest) {
  try {
    const userId = await getDataFromToken(req);
    const user = await Users.findOne({_id: userId}).select("-password");
    
    return NextResponse.json({
      message: "Users Found",
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