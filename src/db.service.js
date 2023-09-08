import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

export const collections = {};

export async function connectToDatabase() {
  const client = new MongoClient(process.env.DB_CONN_STRING);

  try {
    await client.connect();

    const db = client.db("SerumProject");

    collections.notes = db.collection("notes");

    // deleteNote("mwP8lkIKBpPMOVrzYavW6");

    // Add();

    // Edit("qPrha6VqAqOpnKClm0-Xu");

    // getAllNote();
  } catch (err) {
    console.error("DB connection status: failed: ", err);
  } finally {
    console.log("DB connection status: success");
  }
}
