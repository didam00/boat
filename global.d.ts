export {};
import { Mongoose } from "mongoose";

declare global {
    var _mongo: Promise<MongoClient> | undefined;
    var mongoose: {
    promise: Promise<Mongoose> | null;
    conn: Mongoose | null;
    };
}