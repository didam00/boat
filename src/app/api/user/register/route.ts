import Users, { UsersSchema } from "@/models/Users";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { AddressType } from "@/models/Users";
import connect from "@/lib/db";

connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    console.log(reqBody);
    const {
      username,
      password,
      email,
      name,
      nickname,
      phoneNumber,
      country,
      city,
      birth,
      job,
      gender,
    } = reqBody;


    if (await Users.findOne({username})) {
      return NextResponse.json({
        error: "Username already exsits."
      }, {status: 400});
    }

    if (await Users.findOne({email})) {
      return NextResponse.json({
        error: "Email already exsits."
      }, {status: 400});
    }

    if (await Users.findOne({nickname})) {
      return NextResponse.json({
        error: "Nickname already exsits."
      }, {status: 400});
    }

    if (!process.env.SALT) {
      return NextResponse.json({
        error: "Can't find SALT value."
      }, {status: 400});
    }

    const salt = await bcryptjs.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcryptjs.hash(password, salt);

    const address: AddressType = {
      country: country,
      city: city
    }

    const newUser = new Users({
      username,
      password: hashedPassword,
      email,
      name,
      nickname,
      phoneNumber,
      address,
      birth,
      job,
      gender,
    })

    const savedUser = await newUser.save();
    
    return NextResponse.json({
      message: "Users created successfully",
      success: true,
      savedUser
    })

  } catch (error: any) {
    return NextResponse.json(
      {error: error.message},
      {status: 500}
    )
  }
}