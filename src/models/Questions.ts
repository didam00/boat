import { Schema, model, models } from "mongoose";

export interface RespondSchema {
  userId?: string,
  type: string,
  content: string,
}

const respondSchema = new Schema({
  userId: {type: Schema.Types.ObjectId, ref: 'users', required: false},
  type: String,
  content: String
})

export interface QuestionSchema {
  type: string,
  title: string, 
  content: ContentType[],
  hasOtherChoice: boolean,
  otherChoiceType: string,
  choices: ContentType[],
  maxChoices: number,
  minChoices: number,
  hasParentQuestion: boolean,
  parentQuestion: string,
  required: boolean,
  responds: RespondSchema[],
}

const questionSchema = new Schema({
  type:             {type: String},
  title:            {type: String, required: true},
  content:          {type: Schema.Types.Mixed, required: true},
  hasOtherChoice:   {type: Boolean, required: true},
  otherChoiceType:  {type: String, required: false},
  choices:          {type: Schema.Types.Mixed, required: false},
  maxChoices:       {type: Number, required: false},
  minChoices:       {type: Number, required: false},
  hasParentQuestion:{type: Boolean, required: true},
  parentQuestion:   {type: Schema.Types.ObjectId},
  required:         {type: Boolean, required: true},
  responds:         {type: [respondSchema]}
})

export default models.questions || model("questions", questionSchema);