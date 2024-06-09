import { Schema, model, models } from "mongoose";

const formsSchema = new Schema({
  isPublic: Boolean,
  isShortForm: Boolean,
  category: [String],
  votes: Number,
  views: Number,
  title: String,
  author: String,
  questions: {type: [Schema.Types.ObjectId], ref: 'questions'}
}, {
  timestamps: true
});

export default models.forms || model("forms", formsSchema);