import { AddNote, DeleteNote, EditNote } from "./notes.crud";
import RefreshNotes from "./notes.refresh";

const notesContainer = document.querySelector("[data-notesContainer]"),
  title = document.querySelector("[data-title]"),
  content = document.querySelector("[data-content]"),
  addBtn = document.getElementById("add-btn"),
  editBtn = document.getElementById("edit-btn"),
  noteForm = document.querySelector("[data-noteForm]"),
  slideBtn = document.querySelector("[data-slideBtn]"),
  slideIcon = slideBtn.querySelector("i"),
  deleteBtn = document.getElementById("delete-btn");

let isFormOpen = false;

export default function NoteForm(data) {
  title.value = "";
  content.value = "";
  editBtn.style.display = "none";
  addBtn.style.display = "none";

  if (data !== undefined) {
    title.value = data.title || "";
    content.value = data.content || "";
  }

  const oldTitle = title.value,
    oldContent = content.value;

  let btn;

  if (title.value === "" && content.value === "") {
    btn = addBtn;
  } else {
    btn = editBtn;
  }

  // When text is changed, icons (add or edit) are displayed
  title.oninput = () => isChange();
  content.oninput = () => isChange();

  function isChange() {
    btn.style.display = "none";

    if (oldTitle !== title.value || oldContent !== content.value) {
      btn.style.display = "flex";
    }
  }

  // Btn to add new note
  addBtn.onclick = async () => {
    await AddNote(title.value, content.value).catch((err) => {
      console.error("Add action Error: " + err);
      return;
    });

    RefreshNotes();
    Slide();
  };

  // Btn to edit note
  editBtn.onclick = async () => {
    await EditNote(data._id, title.value, content.value).catch((err) => {
      console.error("Edit action error: " + err);
      return;
    });

    RefreshNotes();
    Slide();
  };

  // Btn to delete note
  deleteBtn.onclick = async () => {
    console.log(data._id);
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
