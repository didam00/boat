import { Schema, model, models } from "mongoose";

export interface AddressType {
  country: string,
  city: string,
}

export interface UserSchema {
  username: string,
  password: string,
  email: string,
  name: string,
  nickname: string,
  phoneNumber: string,
  address: AddressType,
  birth: Date,
  job: string,
  gender: string,
}

const userSchema = new Schema<UserSchema>({
  username:     {type: String, required: true, unique: true},
  password:     {type: String, required: true},
  email:        {type: String, required: true},
  name:         {type: String, required: true},
  nickname:     {type: String},
  phoneNumber:  {type: String, required: true},
  address:      {type: Object},
  birth:        {type: Date},
  job:          {type: String},
  gender:       {type: String},
}, {
  timestamps: true
});

export default models.users || model<UserSchema>("users", userSchema);