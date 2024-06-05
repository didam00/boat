import mongoose, { mongo } from 'mongoose'

const DB_URI = process.env.MONGO_URI;

let isConnected = false;

export default function connect() {
  if (isConnected) {
    return;
  }

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

    isConnected = true;

  } catch (error) {
    console.log('MongoDB connection error: ', error);
    process.exit();
  }
}