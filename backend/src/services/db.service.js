import colors from "colors";
import mongoose from "mongoose";

// process because test (mocha / chai)
const MONGODB_URI = process.env.DB_CONN_STRING;

export default async function connectToDatabase() {
  try {
    mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = mongoose.connection;

    db.on("connected", () => {
      console.log("✔︎ ".green + "Connected to MongoDB");
    });

    db.on("error", (err) => {
      throw err;
    });

    db.on("disconnected", () => {
      console.log("✖︎ ".red + "MongoDB disconnected");
    });

    db.once("open", () => {
      console.log("✔︎ ".green + "MongoDB connection opened");
    });
  } catch (err) {
    throw new Error("MongoDB connection failed: ", err);
  }
}
