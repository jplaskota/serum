import NoteFormPanel from "./scripts/notes.form";
import RefreshNotes from "./scripts/notes.refresh";
import SearchNotes from "./scripts/notes.search";
import tools from "./scripts/tools";

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

//Button to display note form
slideBtn.onclick = () => {
  NoteFormPanel.Open();
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
  if (e.deltaY > 0 && !tools.isFormOpen) {
    navbar.style.top = `-${navbar.clientHeight}px`;
  }

  if (e.deltaY < -3 || window.scrollY <= 20) {
    navbar.style.top = "0";
  }

  tools.NavbarColor();
};

// TODO pinned section
// TODO custom scrollbar
