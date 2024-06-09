export {};
import { Mongoose } from "mongoose";

declare global {
    var _mongo: Promise<MongoClient> | undefined;
    var mongoose: {
    promise: Promise<Mongoose> | null;
    conn: Mongoose | null;
    };

    interface VoteFormType {
      public: boolean,
      isShortForm: boolean,
      category: string[],
      votes: number,
      views: number,
      title: string,
      author: string,
      questions: Question[],
    }
    
    type QuestionType = "short" | "multi-short" | "essay" | "choice" | "multi-choice";

    interface Question {
      id: number,
      type: QuestionType,
      title: string,
      content: ContentType[],
      hasOtherChoice: boolean,
      otherChoiceType?: "string" | "number" | "any",
      choices?: ContentType[],
      maxChoices?: number,
      minChoices?: number,
      hasParentQuestion: boolean,
      parentQuestion?: number,
      required: boolean,
    }
    
    interface ContentType {
      id?: string,
      type: "img" | "txt",
      data: string,
      caption?: string
    }
}