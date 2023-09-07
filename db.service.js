import dotenv from "dotenv";
import { MongoClient, ObjectId } from "mongodb";

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

export async function findNote(_id) {
  // todo
}

export async function addNote(newNote) {
  await collections.notes.insertOne(newNote, (err, result) => {
    if (err) throw err;
    console.log("Note added: ", result);
  });
}

export async function updateNote(id, newNote) {
  await collections.notes.updateOne(
    { _id: new ObjectId(id) },
    { $set: newNote },
    (err, result) => {
      if (err) throw err;
      console.log("Note edited: ", result);
    }
  );
}

export async function deleteNote(id) {
  await collections.notes.deleteOne({ _id: ObjectId(id) }, (err, result) => {
    if (err) throw err;
    if (result && result.deletedCount) {
      console.log("Note deleted: ", result);
    } else if (!result?.deletedCount) {
      console.log("Can't find note with this id: ", result);
    } else {
      console.log("Note has not been removed: ", result);
    }
  });
}
