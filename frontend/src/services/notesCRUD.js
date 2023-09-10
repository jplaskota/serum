import { nanoid } from "nanoid";
import { collections } from "./db.service.js";

export async function getAllNote() {
  try {
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
    const note = {
      _id: nanoid(),
      date: Date.now(),
      ...newNote,
    };

    const result = await collections.notes.insertOne(note);

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
