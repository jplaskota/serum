import dotenv from "dotenv";
import { MongoClient, ObjectId } from "mongodb";

dotenv.config();

export const collections = {};

export async function connectToDatabase() {
  const client = new MongoClient(process.env.DB_CONN_STRING);

  try {
    await client.connect();

    const db = client.db("SerumProject");

    collections.notes = db.collection("notes");

    // deleteNote("64f90d76ed5732eb362adaa8");
  } catch (err) {
    console.error("DB connection status: failed: ", err);
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
  try {
    const result = await collections.notes.updateOne(
      { _id: new ObjectId(id) },
      { $set: newNote }
    );

    if (result && result.updateCount) {
      console.log("Note updated: ", result);
    } else if (!result.updateCount) {
      console.log("Can't find note with this id: ", result);
    } else {
      console.log("Note has not been updated", result);
    }
  } catch (err) {
    console.error("Problem with updating note: ", err);
  }
}

export async function deleteNote(id) {
  try {
    const result = await collections.notes.deleteOne({ _id: new ObjectId(id) });

    if (result && result.deleteCount) {
      console.log("Note deleted: ", result);
    } else if (!result.deleteCount) {
      console.log("Can't find note with this id: ", result);
    } else {
      console.log("Note has not been removed: ", result);
    }
  } catch (err) {
    console.error("Problem with deleting note: ", err);
  }
}
