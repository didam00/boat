import { Schema, model, models } from "mongoose";

const respondSchema = new Schema({
  userId: {type: Schema.Types.ObjectId, ref: 'users'},
  type: String,
  content: String
})

const questionSchema = new Schema({
  type:             {type: String},
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
  responds:         [respondSchema]
})

export default models.questions || model("questions", questionSchema);