import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import { nanoid } from "nanoid";

dotenv.config();

const collections = {};

export async function connectToDatabase() {
  const client = new MongoClient(process.env.DB_CONN_STRING);

  try {
    await client.connect();

    const db = client.db("SerumProject");

    collections.notes = db.collection("notes");

    // deleteNote("mwP8lkIKBpPMOVrzYavW6");

    // Add();

    // Edit("qPrha6VqAqOpnKClm0-Xu");

    // console.log(getAllNote());
  } catch (err) {
    console.error("DB connection status: failed: ", err);
  } finally {
    console.log("DB connection status: success");
  }
}

// for test
function Add() {
  addNote({
    _id: nanoid(),
    title: "test 1",
    text: "aaaaa",
    date: Date.now(),
  });
}

// for test
function Edit(id) {
  updateNote(id, {
    title: "edited note",
    text: "ajeee",
  });
}

export async function getAllNote() {
  try {
    const result = await collections.notes.find({}).toArray();

    if (result) {
      console.log("Notes were downloaded: ", result);
      return result;
    } else {
      console.log("Problem with downloading notes");
    }
  } catch (err) {
    console.error("Problem with downloading notes", err);
  }
}

export async function findByIdNote(id) {
  try {
    const result = await collections.notes.findOne({
      _id: id,
    });

    if (result) {
      console.log("Note found");
      return result;
    } else {
      console.log("Can't find note with this id: ", id);
    }
  } catch (err) {
    console.error("Problem with finding note: ", err);
  }
}

export async function addNote(newNote) {
  try {
    const result = await collections.notes.insertOne(newNote);

    if (result && result.insertedId) {
      console.log("Note added: ", result.insertedId);
    } else {
      console.log("Note has not been added: ", result);
    }
  } catch (err) {
    console.error("Problem with adding note: ", err);
  }
}

export async function updateNote(id, newNote) {
  try {
    const result = await collections.notes.updateOne(
      { _id: id },
      { $set: newNote }
    );

    if (result && result.modifiedCount) {
      console.log("Note updated: ", result);
    } else if (!result.modifiedCount) {
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
    const result = await collections.notes.deleteOne({ _id: id });

    if (result && result.deletedCount) {
      console.log("Note deleted: ", result);
    } else if (!result.deletedCount) {
      console.log("Can't find note with this id: ", result);
    } else {
      console.log("Note has not been removed: ", result);
    }
  } catch (err) {
    console.error("Problem with deleting note: ", err);
  }
}
