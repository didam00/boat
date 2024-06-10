// 내용 업데이트

import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/db";
import Questions from "@/models/Questions";
import { Types } from "mongoose";
import Forms from "@/models/Forms";

connect();

export async function POST(req: NextRequest) {
  try {
    const {responds, userId, formId} = await req.json();

    for (let {questionId, content, type} of responds) {
      await Questions.updateOne(
        { _id: questionId },
        { $push:{ responds: 
          {type: type, content: content, userId: userId}
        } }
      )
    }

    await Forms.updateOne(
      { _id: formId },
      { $inc: {
        votes: 1
      } }
    );
    
    return NextResponse.json({
      message: "Responds successfully",
      success: true,
    })

  } catch (error: any) {
    return NextResponse.json(
      {error: error.message},
      {status: 500}
    )
  }
}