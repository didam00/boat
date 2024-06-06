import User, { UserSchema } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { AddressType } from "@/models/User";
import connect from "@/lib/db";
import jwt from "jsonwebtoken";

connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const {
      username,
      password,
    } = reqBody;

    const user = await User.findOne({username});

    if (!user) {
      return NextResponse.json({
        error: "User does not exist"
      }, {
        status: 400
      });
    }

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({
        error: "Invalid password",
      }, {
        status: 400
      })
    }

    const tokenData = {
      id: user._id,
      username: user.username,
    }

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d" // 24시간동안 토큰 유효
    })

    // Create a JSON response indicating successful login
    const response = NextResponse.json({
        message: "Login successful",
        success: true,
    })

    // Set the token as an HTTP-only cookie
    response.cookies.set("token", token, {
        httpOnly: true,
    })

    return response;

  } catch (error: any) {
    return NextResponse.json(
      {error: error.message},
      {status: 500}
    )
  }
}