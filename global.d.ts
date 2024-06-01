export {};
import { Mongoose } from "mongoose";

declare global {
    var _mongo: Promise<MongoClient> | undefined;
    var mongoose: {
    promise: Promise<Mongoose> | null;
    conn: Mongoose | null;
    };

    interface VoteFormType {
      id: number,
      public: boolean,
      isShortForm: boolean,
      category: string[],
      votes: number,
      views: number,
      title: string,
      author: string,
      questions: QuestionType[],
    }
    
    interface QuestionType {
      id: number,
      type: "short" | "multi-short" | "essay" | "choice" | "multi-choice",
      title: string,
      content: ContentType[],
      hasOtherChoice: boolean,
      otherChoiceType?: "string" | "number" | "any",
      choices?: ContentType[],
      maxChoice?: number,
      minChoice?: number,
      hasParentQuestion: boolean,
      parentQuestion?: number
    }
    
    interface ContentType {
      type: "img" | "txt",
      data: string
    }
}