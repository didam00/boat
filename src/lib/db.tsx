import {MongoClient} from 'mongodb'

const URI = process.env.MONGO_URI;

if (!URI) {
    throw new Error('The MONGODB_URL environment variable is not defined')
}

let connectDB: Promise<MongoClient>;
if (process.env.NODE_ENV === 'development') {
    if (!global._mongo) {
        global._mongo = new MongoClient(URI).connect()
    }
    connectDB = global._mongo
} else {
    connectDB = new MongoClient(URI).connect()
}

export {connectDB}