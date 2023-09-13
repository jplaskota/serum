import Macy from "macy";
import {
  addNote,
  deleteNote,
  editNote,
  getNoteById,
  getNotes,
} from "./js/notes";

const noteContainer = document.querySelector("[data-noteContainer]");
const addBtn = document.querySelector("[data-add]");
const addForm = document.querySelector("[data-addForm]");
const blur = document.querySelector("[data-blur]");

// Layout to notes container using macy package
const macyInstance = new Macy({
  container: noteContainer,
  trueOrder: true,
  columns: 5,
  margin: 15,
  breakAt: {
    1201: 4,
    1025: 3,
    769: 2,
    481: 1,
  },
});

// Macy must recalculate when page is fully loaded
window.onload = () => {
  refreshNotes();
  console.log("loaded");
};

async function refreshNotes() {
  const notes = await getNotes();
  if (!notes) throw new Error("No notes found");

  noteContainer.innerHTML = "";
  notes.forEach((note) => {
    generateNote(note);
  });

  macyInstance.reInit();
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

// button to show new now form
addBtn.addEventListener("click", () => {
  blur.classList.add("blur");
  addForm.classList.add("visible");
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    blur.classList.remove("blur");
    addForm.classList.remove("visible");
  }
});
