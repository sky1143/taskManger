import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/taskManger";

if (!MONGODB_URI) {
   throw new Error('❌ MongoDB URI is missing in .env.local');
}

let cached = global.mongoose || { conn: null, promise: null };

export async function connectToDatabase() {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        console.log("🚀 Connecting to MongoDB...");
        cached.promise = mongoose.connect(MONGODB_URI, {
            dbName: "taskManger", // ✅ Ensure we use the correct database
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
    
    cached.conn = await cached.promise;
    console.log("✅ MongoDB connected successfully");
    return cached.conn;
}
