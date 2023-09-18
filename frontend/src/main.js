import { NoteForm } from "./scripts/notes.form.js";
import { RefreshNotes } from "./scripts/notes.refresh.js";

const slideBtn = document.querySelector("[data-slideBtn]");

// Macy must recalculate when page is fully loaded
window.onload = () => {
  RefreshNotes();
};

// Slide (status) between notes-container and form
let isFormOpen = false;

// Button to display note form
slideBtn.onclick = () => {
  isFormOpen = NoteForm();
  console.log(isFormOpen);
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
