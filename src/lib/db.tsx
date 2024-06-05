import mongoose, { mongo } from 'mongoose'

const DB_URI = process.env.MONGO_URI;

export default function connect() {
  try {
    mongoose.connect(DB_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    })

    connection.on("error", err => {
      console.log("MongoDB connection error" + err);
      process.exit();
    })
  } catch (error) {
    console.log(error);
  }
}