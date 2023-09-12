import Macy from "macy";
import "./style.css";

const noteContainer = document.querySelector("[data-noteContainer]");

/// Layout to notes container using macy package
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

/// Macy must recalculate when page is fully loaded
window.onload = () => {
  macyInstance.reInit();
  console.log("loaded");
};

function generateNote(_data) {
  const noteBox = document.createElement("div");
  noteBox.className = "noteBox";
  noteBox.tabIndex = 0;

  const note = document.createElement("div");
  note.className = "note";
  noteBox.appendChild(note);

  const title = document.createElement("div");
  title.className = "noteTitle bold";
  title.textContent = _data.title;
  note.appendChild(title);

  const content = document.createElement("div");
  content.className = "noteText";
  content.textContent = _data.content;
  note.appendChild(content);
}
