import mongoose from 'mongoose'

const DB_URI = process.env.MONGO_URI;

if (DB_URI) {
    mongoose.connect(DB_URI);
} else {
    console.error("Can't find MONGO_URI.");
}