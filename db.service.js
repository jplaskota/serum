import dotenv from "dotenv";
import * as MongoDB from "mongodb";

dotenv.config();

export let notes;

export async function connectToDatabase() {
  const client = new MongoDB.MongoClient(process.env.DB_CONN_STRING);

  try {
    await client.connect();

    const db = client.db("SerumProject");

    notes = await db.collection("notes").find({}).toArray();

    // await addNote(client, {
    //   title: "db test 2",
    //   text: "bbb",
    //   date: Date.now(),
    // });
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

async function addNote(client, newNote) {
  const result = await client
    .db("SerumProject")
    .collection("notes")
    .insertOne(newNote);

  console.log("Note added");
}
