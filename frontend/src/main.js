import Macy from "macy";
import { addNote } from "./scripts/notes.crud.js";
import { refreshNotes } from "./scripts/notes.refresh.js";

export const notesContainer = document.querySelector("[data-notesContainer]");

const title = document.querySelector("[data-title]"),
  content = document.querySelector("[data-content]"),
  addBtn = document.getElementById("add-btn"),
  noteForm = document.querySelector("[data-noteForm]"),
  slideBtn = document.querySelector("[data-slideBtn]"),
  slideImg = slideBtn.querySelector("img"),
  navbar = document.getElementById("navbar");

// Layout to notes container using macy package
const macyInstance = new Macy({
  container: notesContainer,
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
  refreshNotes(macyInstance, notesContainer);
  console.log("loaded");
};

// Slide between notes container and form
let isFormOpen = false;

function Slide() {
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

// Button to display note form
slideBtn.onclick = () => {
  console.log("s");
  Slide();
};

// Navbar hide function
onwheel = (e) => {
  if (e.deltaY > 0 && !isFormOpen) {
    navbar.style.top = `-${navbar.clientHeight}px`;
  }

  if (e.deltaY < -3 || window.scrollY <= 20) {
    navbar.style.top = "0";
  }
};

// Btn to add new note
addBtn.onclick = async () => {
  await addNote(title.value, content.value).catch((err) => {
    console.error("Add action Error: " + err);
    return;
  });
};
