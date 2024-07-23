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
      console.log("Connected to MongoDB");
    })

    connection.on("error", err => {
      process.exit();
    })

    isConnected = true;

  } catch (error) {
    process.exit();
  }
}