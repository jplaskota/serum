import NoteForm from "./scripts/notes.form.js";
import RefreshNotes from "./scripts/notes.refresh.js";
import SearchNotes from "./scripts/notes.search.js";

const slideBtn = document.querySelector("[data-slideBtn]"),
  searchBox = document.getElementById("search-box"),
  searchInput = document.getElementById("search-input"),
  toggleSearch = document.getElementById("search-btn");

// Macy must recalculate when page is fully loaded
window.onload = () => {
  RefreshNotes();
};

// Slide (status) between notes-container and form
let isFormOpen = false;

// Button to display note form
slideBtn.onclick = () => {
  isFormOpen = NoteForm();
};

// Button to display search bar
toggleSearch.onclick = () => {
  searchBox.classList.toggle("show-search-box");
};

let searchTimeout;

searchInput.oninput = () => {
  // Clear any existing timeout
  clearTimeout(searchTimeout);

  // Set a new timeout
  searchTimeout = setTimeout(() => {
    const searchText = searchInput.value;
    if (searchText) {
      SearchNotes(searchText);
    } else {
      RefreshNotes();
    }
  }, 300);
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
