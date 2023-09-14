import Macy from "macy";
import { refreshNotes } from "./js/notes.logic.js";

export const noteContainer = document.querySelector("[data-noteContainer]");
const noteForm = document.querySelector("[data-noteForm]");
const title = document.querySelector("[data-title]");
const content = document.querySelector("[data-content]");

const pageSlide = document.querySelector("[data-pageSlide]");
const slideBtn = document.querySelector("[data-slideBtn]");

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
  refreshNotes(macyInstance);
  console.log("loaded");
};

let isFormOpen = false;

function Slide() {
  if (isFormOpen) {
    noteForm.classList.remove("form-slide");
    pageSlide.classList.remove("page-slide");
    slideBtn.classList.remove("btn-slide");
    isFormOpen = false;
    return;
  }
  noteForm.classList.add("form-slide");
  pageSlide.classList.add("page-slide");
  slideBtn.classList.add("btn-slide");
  isFormOpen = true;
}
// button to show note form
slideBtn.addEventListener("click", () => {
  Slide();
});
