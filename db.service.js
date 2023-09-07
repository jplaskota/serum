import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const collections = {};

export async function connectToDatabase() {
  const client = new MongoClient(process.env.DB_CONN_STRING);

  try {
    await client.connect();

    const db = client.db("SerumProject");

    collections.notes = db.collection("notes");
  } catch (e) {
    console.error("DB connection status: failed: ", e);
  } finally {
    console.log("DB connection status: success");
  }
}

export async function addNote(newNote) {
  const result = await collections.notes.insertOne(newNote);

  console.log("Note added: ", result);
}

export async function updateNote(_id, newNote) {
  // todo
}

export async function deleteNote(_id) {
  // todo
}
