import mongoose from "mongoose";

export const collections = {};

const MONGODB_URI = import.meta.env.VITE_DB_CONN_STRING;

export async function connectToDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);

    db.on("error", console.error.bind(console, "MongoDB connection error:"));
    db.once("open", () => {
      console.log("MongoDB connected");
      const serumDb = db.useDb("SerumProject");

      collections.notes = serumDb.collection("notes");
    });
  } catch (err) {
    console.error("DB connection status: failed: ", err);
    throw err;
  }
}
