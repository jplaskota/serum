import { noteContainer } from "../main.js";
import {
  addNote,
  deleteNote,
  editNote,
  getNoteById,
  getNotes,
} from "./notes.crud.js";

export async function refreshNotes(macy) {
  const notes = await getNotes();
  if (!notes) throw new Error("No notes found");

  noteContainer.innerHTML = "";
  notes.forEach((note) => {
    generateNote(note);
  });

  macy.reInit();
}

function generateNote(data) {
  const noteBox = document.createElement("div");
  noteBox.className = "note-box";
  noteBox.tabIndex = 0;

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

  noteContainer.appendChild(noteBox);
}
