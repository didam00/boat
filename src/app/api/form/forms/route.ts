import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/db";
import Forms from "@/models/Forms"

connect();

export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams;
    /** 한 번에 몇 페이지씩 가져올 건지 */
    const pageSize = Number(params.get("pageSize")) || 15;
    /** 몇 번째 페이지인지 */
    const page = Number(params.get("page")) || 1;

    /** isPublic이며 questions field를 제외하고 검색한다. 최대 pageSize개를 가져오고 (page-1) * pageSize만큼 스킵하여 가져온다 */
    const forms = await Forms.find({isPublic: true})
                             .select("-questions")
                             .limit(pageSize)
                             .skip((page-1) * pageSize);
    
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
