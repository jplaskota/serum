import NoteFormPanel from "./scripts/notes.form";
import RefreshNotes from "./scripts/notes.refresh";
import SearchNotes from "./scripts/notes.search";
import Tools from "./scripts/tools";

const slideBtn = document.querySelector("[data-slideBtn]"),
  searchBox = document.getElementById("search-box"),
  searchInput = document.getElementById("search-input"),
  navbar = document.getElementById("navbar"),
  scrollbar = document.getElementById("scrollbar"),
  toggleSearch = document.getElementById("search-btn");

window.onload = () => {
  RefreshNotes();
};

// Event handler for the button to display the note form
slideBtn.onclick = () => {
  NoteFormPanel.Toggle();
};

// Event handler for the button to display the search bar
toggleSearch.onclick = () => {
  searchBox.classList.toggle("show-search-box");
  searchInput.focus();

  // If hiding the search box, reset the input and refresh notes
  if (!searchBox.classList.contains("show-search-box")) {
    setTimeout(() => {
      searchInput.blur();
      searchInput.value = "";
      RefreshNotes();
    }, 300);
  }
};

let searchTimeout;

// Event handler for the search input
searchInput.oninput = () => {
  clearTimeout(searchTimeout);

  searchTimeout = setTimeout(() => {
    const searchText = searchInput.value;
    if (searchText) {
      SearchNotes(searchText); // Perform a search if there is input
    } else {
      RefreshNotes(); // Refresh notes if input is empty
    }
  }, 300);
};

// Event handler for scrolling to hide/show the navbar
onwheel = (e) => {
  if (e.deltaY > 2 && !Tools.isFormOpen) {
    navbar.style.top = `-${navbar.clientHeight}px`; // Hide navbar when scrolling down
  }

  if (e.deltaY < -3 || window.scrollY <= 10) {
    navbar.style.top = "0"; // Show navbar when scrolling up or at the top
  }

  // Calculate the new scrollbar value based on page scroll position
  const newScrollVal = Math.round(
    (window.scrollY / (document.body.offsetHeight - window.innerHeight)) * 100
  );

  // Update the scrollbar value
  scrollbar.value = newScrollVal;

  Tools.NavbarColor(); // Adjust navbar color
};

// Event handler for custom scrollbar input
scrollbar.oninput = () => {
  // Calculate the new scroll position based on the scrollbar value
  const position = Math.round(
    (document.body.offsetHeight - window.innerHeight) * (scrollbar.value / 100)
  );

  // Scroll the page to the new position
  window.scrollTo(0, position);
};

// TODO: Implement pinned section
// TODO: Implement custom scrollbar
