import { AddNote, DeleteNote, EditNote } from "./notes.crud";
import RefreshNotes from "./notes.refresh";

const notesContainer = document.querySelector("[data-notesContainer]"),
  title = document.getElementById("new-title"),
  content = document.getElementById("new-content"),
  addBtn = document.getElementById("add-btn"),
  editBtn = document.getElementById("edit-btn"),
  noteForm = document.querySelector("[data-noteForm]"),
  slideBtn = document.querySelector("[data-slideBtn]"),
  slideIcon = slideBtn.querySelector("i"),
  deleteBtn = document.getElementById("delete-btn");

let isFormOpen = false;

export default function NoteForm(data) {
  title.textContent = "";
  content.textContent = "";
  editBtn.style.display = "none";
  addBtn.style.display = "none";
  deleteBtn.style.display = "none";

  title.focus();

  if (data !== undefined) {
    title.textContent = data.title || "";
    content.textContent = data.content || "";
    deleteBtn.style.display = "flex";
    title.blur();
  }

  const oldTitle = title.textContent,
    oldContent = content.textContent;

  // Add new note = add btn | Edit note = edit btn
  let btn = editBtn;

  if (title.textContent === "" && content.textContent === "") {
    btn = addBtn;
  }

  // When text is changed, icons (add or edit | delete) are displayed
  title.oninput = () => isChange();
  content.oninput = () => isChange();

  function isChange() {
    btn.style.display = "none";
    deleteBtn.style.display = "none";

    if (oldTitle !== title.textContent || oldContent !== content.textContent) {
      btn.style.display = "flex";
    }

    if (title.textContent.length > 0 || content.textContent.length > 0) {
      deleteBtn.style.display = "flex";
    }
  }

  // Shortcut for add / edit and delete
  onkeydown = (e) => {
    if (
      e.key === "Enter" &&
      document.activeElement !== title &&
      document.activeElement !== content &&
      noteForm.classList.contains("form-slide")
    ) {
      btn.click();
    }

    if (
      e.key === "Backspace" &&
      document.activeElement !== title &&
      document.activeElement !== content &&
      noteForm.classList.contains("form-slide")
    ) {
      deleteBtn.click();
    }
  };

  // Btn to add new note
  addBtn.onclick = async () => {
    await AddNote(title.textContent, content.textContent).catch((err) => {
      console.error("Add action Error: " + err);
      return;
    });

    RefreshNotes();
    Slide();
  };

  // Btn to edit note
  editBtn.onclick = async () => {
    await EditNote(data._id, title.textContent, content.textContent).catch(
      (err) => {
        console.error("Edit action error: " + err);
        return;
      }
    );

    RefreshNotes();
    Slide();
  };

  // Btn to delete note
  deleteBtn.onclick = async () => {
    if (data === undefined) {
      Slide();
      return;
    }

    await DeleteNote(data._id).catch((err) => {
      console.log("Delete action error: " + err);
      return;
    });

    RefreshNotes();
    Slide();
  };

  // Function to slide between notes-container and form
  function Slide() {
    noteForm.classList.toggle("form-slide");
    notesContainer.classList.toggle("notes-slide");
    slideBtn.classList.toggle("icon-move");
    slideIcon.classList.toggle("icon-rotate");

    isFormOpen = !isFormOpen;
    return isFormOpen;
  }

  return Slide();
}
