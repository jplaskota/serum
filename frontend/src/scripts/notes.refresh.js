import Macy from "macy";
import { GetNotes } from "./notes.crud";
import NoteFormPanel from "./notes.form";

const notesContainer = document.querySelector("[data-notesContainer]");

// Layout to notes container using macy package
const macyInstance = new Macy({
  container: notesContainer,
  trueOrder: false,
  columns: 5,
  margin: 15,
  breakAt: {
    1201: 4,
    1025: 3,
    769: 2,
    481: 1,
  },
});

// Downloading and displaying notes on the board
export default async function RefreshNotes(data) {
  let notes;

  if (data !== undefined) {
    notes = data;
  } else {
    notes = await GetNotes();
  }

  if (!notes) throw new Error("No notes found");

  notesContainer.innerHTML = "";
  notes.forEach((note) => {
    GenerateNote(note);
  });

  macyInstance.reInit();
}

// Creating a note and adding it to the board
function GenerateNote(data) {
  const noteBox = document.createElement("div");
  noteBox.className = "note-box";
  noteBox.tabIndex = 0;
  noteBox.ondblclick = (e) => {
    NoteFormPanel.Open(data);
  };

  const note = document.createElement("div");
  note.className = "note";
  noteBox.appendChild(note);

  const title = document.createElement("div");
  title.className = "title bold";
  title.textContent = data.title;
  note.appendChild(title);

  const content = document.createElement("div");
  content.className = "content";
  content.textContent = data.content;
  note.appendChild(content);

  notesContainer.appendChild(noteBox);
}
