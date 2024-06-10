import { Schema, model, models } from "mongoose";
import { QuestionSchema } from "./Questions";

export interface VoteFormSchema {
  isPublic: boolean,    
  isShortForm: boolean,
  category: string[],
  votes: number,
  views: number,
  title: string,
  author: string,
  questions: QuestionSchema[],
}

const formsSchema = new Schema({
  isPublic:     {type: Boolean},
  isShortForm:  {type: Boolean},
  category:     {type: [String]},
  votes:        {type: Number},
  views:        {type: Number},
  title:        {type: String},
  author:       {type: String},
  questions:    {type: [Schema.Types.ObjectId], ref: 'questions'}
}, {
  timestamps: true
});

export default models.forms || model("forms", formsSchema);