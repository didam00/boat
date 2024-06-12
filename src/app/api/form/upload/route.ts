import Users, { UsersSchema } from "@/models/Users";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/db";
import Forms from "@/models/Forms";
import Questions from "@/models/Questions";

connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const {
      isPublic,
      isShortForm,
      isAllowAll,
      category,
      votes,
      views,
      title,
      author,
      questions
    }: {
      isPublic: boolean,
      isShortForm: boolean,
      isAllowAll: boolean,
      category: string[],
      votes: number,
      views: number,
      title: string,
      author: string,
      questions: Question[]
    } = reqBody;
    
    const questionList: any[] = [];

    try {
      for (let question of questions) {
        const newQuestion = new Questions({
          ...question,
          responds: []
        });

        questionList.push(newQuestion._id);
        await newQuestion.save();
      }
    } catch (error: any) {
      console.log(error);
    }

    const newForm = new Forms({
      isPublic,
      isShortForm,
      isAllowAll,
      category,
      votes,
      views,
      title,
      author,
      questions: questionList
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