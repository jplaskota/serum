import Macy from "macy";
import {
  addNote,
  deleteNote,
  editNote,
  getNoteById,
  getNotes,
} from "./scripts/notes.crud.js";

const notesContainer = document.querySelector("[data-notesContainer]"),
  title = document.querySelector("[data-title]"),
  content = document.querySelector("[data-content]"),
  addBtn = document.getElementById("add-btn"),
  editBtn = document.getElementById("edit-btn"),
  deleteBtn = document.getElementById("delete-btn"),
  noteForm = document.querySelector("[data-noteForm]"),
  slideBtn = document.querySelector("[data-slideBtn]"),
  slideImg = slideBtn.querySelector("img"),
  navbar = document.getElementById("navbar");

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

// Macy must recalculate when page is fully loaded
window.onload = () => {
  refreshNotes();
  console.log("loaded");
};

// Downloading and displaying notes on the board
async function refreshNotes() {
  const notes = await getNotes();
  if (!notes) throw new Error("No notes found");

  notesContainer.innerHTML = "";
  notes.forEach((note) => {
    generateNote(note);
  });

  macyInstance.reInit();
}

// Creating a note and adding it to the board
function generateNote(data) {
  const noteBox = document.createElement("div");
  noteBox.className = "note-box";
  noteBox.tabIndex = 0;
  noteBox.ondblclick = (e) => {
    Slide(data);
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

// Button to display note form
slideBtn.onclick = () => {
  Slide();
};

// Slide between notes container and form
let isFormOpen = false;

function Slide(data) {
  title.value = "";
  content.value = "";
  editBtn.style.display = "none";
  addBtn.style.display = "none";

  if (data !== undefined) {
    title.value = data.title || "";
    content.value = data.content || "";
  }

  const oldTitle = title.value,
    oldContent = content.value;

  let btn;

  if (title.value === "" && content.value === "") {
    btn = addBtn;
  } else {
    btn = editBtn;
  }

  // When text is changed, icons (add or edit) are displayed
  title.oninput = () => isChange();
  content.oninput = () => isChange();

  function isChange() {
    btn.style.display = "none";

    if (oldTitle !== title.value || oldContent !== content.value) {
      btn.style.display = "flex";
    }
  }

  // Btn to add new note
  addBtn.onclick = async () => {
    const result = await addNote(title.value, content.value).catch((err) => {
      console.error("Add action Error: " + err);
      return;
    });

    console.log(result);
  };

  // Btn to edit note
  editBtn.onclick = async () => {
    const result = await editNote(data._id, title.value, content.value).catch(
      (err) => {
        console.error("Edit action error: " + err);
        return;
      }
    );

    console.log(result);
  };

  deleteBtn.onclick = async () => {
    console.log(data._id);
    const result = await deleteNote(data._id).catch((err) => {
      console.log("Delete action error: " + err);
      return;
    });

    console.log(result);
  };

  if (isFormOpen) {
    noteForm.classList.remove("form-slide");
    notesContainer.classList.remove("notes-slide");
    slideBtn.style.justifyContent = "left";
    slideImg.style.transform = "rotate(0deg)";
    isFormOpen = false;
    return;
  }

  noteForm.classList.add("form-slide");
  notesContainer.classList.add("notes-slide");
  slideBtn.style.justifyContent = "right";
  slideImg.style.transform = "rotate(180deg)";
  navbar.style.top = "0";
  isFormOpen = true;
}

// Navbar hide function
onwheel = (e) => {
  if (e.deltaY > 0 && !isFormOpen) {
    navbar.style.top = `-${navbar.clientHeight}px`;
  }

  if (e.deltaY < -3 || window.scrollY <= 20) {
    navbar.style.top = "0";
  }
};
