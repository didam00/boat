import { Schema, model, models } from "mongoose";

export interface AddressType {
  country: string,
  city: string,
}

export interface UsersSchema {
  _id: string,
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
  point: number,
}

const usersSchema = new Schema<UsersSchema>({
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
  point:        {type: Number}
}, {
  timestamps: true
});

export default models.users || model<UsersSchema>("users", usersSchema);