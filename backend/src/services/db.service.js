import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const MONGODB_URI = process.env.DB_CONN_STRING;

export default async function connectToDatabase() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = mongoose.connection;

    db.on("connected", () => {
      console.log("Connected to MongoDB");
    });
    db.on("error", (err) => {
      console.error("MongoDB connection error:", err);
      throw err;
    });
    db.on("disconnected", () => {
      console.log("MongoDB disconnected");
    });
    db.once("open", () => {
      console.log("MongoDB connected");
    });
  } catch (err) {
    console.error("MongoDB connection failed: ", err);
    throw err;
  }
}
