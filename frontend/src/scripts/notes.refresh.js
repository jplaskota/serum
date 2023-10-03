import Macy from "macy";
import { GetNotes } from "./notes.crud";
import NoteFormPanel from "./notes.form";

const notesContainer = document.querySelector("[data-notesContainer]");

// Create a responsive grid layout using Macy
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

// Function to download and display notes on the board
export default async function RefreshNotes(data) {
  let notes;

  if (data !== undefined) {
    notes = data; // Use the provided data if available
  } else {
    notes = await GetNotes(); // Otherwise, fetch notes using GetNotes function
  }

  if (!notes) throw new Error("No notes found");

  notesContainer.innerHTML = "";

  notes.forEach((note) => {
    GenerateNote(note);
  });

  // Reinitialize the Macy instance to adjust the layout
  macyInstance.reInit();
}

// Function to create a note and add it to the board
function GenerateNote(data) {
  const noteBox = document.createElement("div");
  noteBox.className = "note-box";
  noteBox.tabIndex = 0;
  noteBox.ondblclick = (e) => {
    NoteFormPanel.Toggle(data); // Toggle the note form panel when double-clicked
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
