import { nanoid } from "nanoid";
import { collections } from "../src/db.service.js";

const noteContainer = document.querySelector("[data-noteContainer]");

// const notes = getAllNote();
// console.log(notes);

const macyInstance = Macy({
  container: noteContainer,
  trueOrder: true,
  columns: 5,
  margin: {
    x: 15,
    y: 15,
  },
  breakAt: {
    1201: 4,
    1025: 3,
    769: 2,
    481: 1,
  },
});

function Add() {
  addNote({
    _id: nanoid(),
    title: "test 1",
    text: "aaaaa",
    date: Date.now(),
  });
}

// // for test
// function Edit(id) {
//   updateNote(id, {
//     title: "edited note",
//     text: "test",
//   });
// }

window.onload = () => {
  macyInstance.reInit();
  console.log("loaded");
};

function generateNote(xNote) {
  const noteBox = document.createElement("div");
  noteBox.className = "noteBox";
  noteBox.tabIndex = 0;

  const note = document.createElement("div");
  note.className = "note";
  noteBox.appendChild(note);

  const title = document.createElement("div");
  title.className = "noteTitle bold";
  title.textContent = xNote.title;
  note.appendChild(title);

  const text = document.createElement("div");
  text.className = "noteText";
  text.textContent = xNote.text;
  note.appendChild(text);
}

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
