import NoteFormPanel from "./scripts/notes.form.js";
import RefreshNotes from "./scripts/notes.refresh.js";
import SearchNotes from "./scripts/notes.search.js";

const slideBtn = document.querySelector("[data-slideBtn]"),
  searchBox = document.getElementById("search-box"),
  searchInput = document.getElementById("search-input"),
  navbar = document.getElementById("navbar"),
  toggleSearch = document.getElementById("search-btn");

// Macy must recalculate when page is fully loaded
window.onload = () => {
  RefreshNotes();
  window.scrollTo(0, 0);
};

// Slide (status) between notes-container and form
function isFormOpen() {
  return NoteFormPanel.isOpen();
}

// Button to display note form
slideBtn.onclick = () => {
  NoteFormPanel.open();
};

// Button to display search bar
toggleSearch.onclick = () => {
  searchBox.classList.toggle("show-search-box");
  searchInput.focus();

  if (!searchBox.classList.contains("show-search-box")) {
    setTimeout(() => {
      searchInput.blur();
      searchInput.value = "";
      RefreshNotes();
    }, 300);
  }
};

let searchTimeout;

// Search function
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
  if (e.deltaY > 0 && !isFormOpen()) {
    navbar.style.top = `-${navbar.clientHeight}px`;
  }

  if (e.deltaY < -3 || window.scrollY <= 20) {
    navbar.style.top = "0";
  }

  navbarColor();
};

// Navbar color function
export function navbarColor() {
  if (isFormOpen()) {
    navbar.style.top = "0";
  }

  if (window.scrollY === 0 || isFormOpen()) {
    navbar.style.backgroundColor = "transparent";
    navbar.style.boxShadow = "none";
  } else {
    navbar.style.backgroundColor = "var(--background)";
    navbar.style.boxShadow = "0 0 10px var(--background)";
  }
}

// TODO pinned section
// TODO isFormOpen get set or something
