import { Schema, model, models } from "mongoose";

const questionSchema = new Schema({
  type:             {type: String, required: true},
  title:            {type: String, required: true},
  content:          {type: Schema.Types.Mixed, required: true},
  hasOtherChoice:   {type: String, required: true},
  otherChoiceType:  {type: String, required: false},
  choices:          {type: Schema.Types.Mixed, required: false},
  maxChoices:       {type: Number, required: false},
  minChoices:       {type: Number, required: false},
  hasParentQuestion:{type: Boolean, required: true},
  parentQuestion:   {type: Schema.Types.ObjectId},
  required:         {type: Boolean, required: true},
})

const formsSchema = new Schema<VoteFormType>({
  isPublic:     {type: Boolean, required: true},
  isShortForm:  {type: Boolean, required: true},
  category:     {type: [String], required: true},
  votes:        {type: Number, required: true},
  views:        {type: Number, required: true},
  title:        {type: String, required: true},
  author:       {type: String, required: true},
  questions:    {type: [questionSchema], required: true},
}, {
  timestamps: true
});

export default models.forms || model("forms", formsSchema);