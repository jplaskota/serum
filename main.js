import { connectToDatabase } from "./src/services/db.js";
import "./style.css";

connectToDatabase().catch((e) => {
  console.error(e);
});

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

// function Add() {
//   addNote({
//     title: "test 1",
//     text: "aaaaa",
//   });
// }

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
