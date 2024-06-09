import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/db";
import Forms from "@/models/Forms"

connect();

export async function GET(req: NextRequest) {
  try {
    const forms = await Forms.find({}).select("-questions");
    
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

// import Users, { UsersSchema } from "@/models/Users";
// import { NextRequest, NextResponse } from "next/server";
// import connect from "@/lib/db";
// import Forms from "@/models/Forms";

// connect();

// export async function GET() {
//   console.log("************ hello world");

//   try {
//     const formList = await Forms.find({}, {
//       _id: true,
//       title: true,
//       category: true,
//       views: true,
//       votes: true,
//       isShortForm: true,
//       author: true,
//     })

//     console.log("---------------------------------------");
//     console.log(formList)
//     console.log("---------------------------------------");

//     return NextResponse.json({
//       message: "Users found successfully",
//       success: true,
//       data: formList
//     })

//   } catch (error: any) {
//     return NextResponse.json(
//       {error: error.message},
//       {status: 500}
//     )
//   }
// }