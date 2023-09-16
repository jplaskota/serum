import Macy from "macy";
import { addNote } from "./js/notes.crud.js";
import { refreshNotes } from "./js/notes.logic.js";

export const notesContainer = document.querySelector("[data-notesContainer]");
const title = document.querySelector("[data-title]");
const content = document.querySelector("[data-content]");
const addBtn = document.getElementById("add-btn");

const noteForm = document.querySelector("[data-noteForm]");
const slideBtn = document.querySelector("[data-slideBtn]");
const slideImg = slideBtn.querySelector("img");
const navbar = document.getElementById("navbar");

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
  refreshNotes(macyInstance);
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
slideBtn.addEventListener("click", () => {
  Slide();
});

// navbar hide function
onwheel = (e) => {
  console.log("scroll: " + e.deltaY);
  console.log("window: " + window.scrollY);
  console.log(navbar.style.top);

  if (e.deltaY > 0 && !isFormOpen) {
    navbar.style.top = `-${navbar.clientHeight}px`;
  }

  if (e.deltaY < -3 || window.scrollY <= 20) {
    navbar.style.top = "0";
  }
};

addBtn.addEventListener("click", async () => {
  await addNote(title.value, content.value).catch((err) => {
    console.error(err);
    return;
  });

  console.log("Note added");
});

// TODO New note has been added, but twice
