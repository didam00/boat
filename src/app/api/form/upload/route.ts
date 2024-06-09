import Users, { UsersSchema } from "@/models/Users";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/db";
import Forms from "@/models/Forms";

connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const {
      isPublic,
      isShortForm,
      category,
      votes,
      views,
      title,
      author,
      questions
    } = reqBody;
    
    const newForm = new Forms({
      isPublic,
      isShortForm,
      category,
      votes,
      views,
      title,
      author,
      questions
    });

    const savedForm = await newForm.save();
    
    return NextResponse.json({
      message: "Users created successfully",
      success: true,
      savedForm
    })

  } catch (error: any) {
    return NextResponse.json(
      {error: error.message},
      {status: 500}
    )
  }
}