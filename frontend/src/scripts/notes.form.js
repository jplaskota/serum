import { AddNote, DeleteNote, EditNote } from "./notes.crud";
import RefreshNotes from "./notes.refresh";

export default class NoteForm {
  constructor() {
    this.title = document.getElementById("new-title");
    this.content = document.getElementById("new-content");
    this.addBtn = document.getElementById("add-btn");
    this.editBtn = document.getElementById("edit-btn");
    this.noteForm = document.querySelector("[data-noteForm]");
    this.notesContainer = document.querySelector("[data-notesContainer]");
    this.slideBtn = document.querySelector("[data-slideBtn]");
    this.slideIcon = this.slideBtn.querySelector("i");
    this.deleteBtn = document.getElementById("delete-btn");
    this.isFormOpen = false;
    this.data = null; // Store data here when the form is open

    this.addBtn.addEventListener("click", () => {
      this.add();
    });

    this.editBtn.addEventListener("click", () => {
      this.edit();
    });

    this.deleteBtn.addEventListener("click", () => {
      this.delete();
    });
  }

  slideData(data) {
    this.data = data; // Store the data when opening the form
    this.title.textContent = "";
    this.content.textContent = "";
    this.editBtn.style.display = "none";
    this.addBtn.style.display = "none";
    this.deleteBtn.style.display = "none";
    this.title.focus();

    if (data !== undefined) {
      this.title.textContent = data.title || "";
      this.content.textContent = data.content || "";
      this.deleteBtn.style.display = "flex";
      this.title.blur();
    }

    this.oldTitle = this.title.textContent;
    this.oldContent = this.content.textContent;

    // Add new note = add btn | Edit note = edit btn
    this.btn = this.editBtn;

    if (this.title.textContent === "" && this.content.textContent === "") {
      this.btn = this.addBtn;
    }

    // When text is changed, icons (add or edit | delete) are displayed
    this.title.oninput = () => this.isChange();
    this.content.oninput = () => this.isChange();

    this.slide();
  }

  isChange() {
    this.btn.style.display = "none";
    this.deleteBtn.style.display = "none";

    if (
      this.oldTitle !== this.title.textContent ||
      this.oldContent !== this.content.textContent
    ) {
      this.btn.style.display = "flex";
    }

    if (
      this.title.textContent.length > 0 ||
      this.content.textContent.length > 0
    ) {
      this.deleteBtn.style.display = "flex";
    }
  }

  // Btn to add new note
  async add() {
    await AddNote(this.title.textContent, this.content.textContent).catch(
      (err) => {
        console.error("Add action Error: " + err);
        return;
      }
    );

    RefreshNotes();
    this.slide();
  }

  // Btn to edit note
  async edit() {
    if (!this.data) {
      console.error("Data not available for edit.");
      return;
    }

    await EditNote(
      this.data._id,
      this.title.textContent,
      this.content.textContent
    ).catch((err) => {
      console.error("Edit action error: " + err);
      return;
    });

    RefreshNotes();
    this.slide();
  }

  // Btn to delete note
  async delete() {
    if (!this.data) {
      console.error("Data not available for delete.");
      return;
    }

    await DeleteNote(this.data._id).catch((err) => {
      console.log("Delete action error: " + err);
      return;
    });

    RefreshNotes();
    this.slide();
  }

  // Function to slide between notes-container and form
  slide() {
    this.noteForm.classList.toggle("form-slide");
    this.notesContainer.classList.toggle("notes-slide");
    this.slideBtn.classList.toggle("icon-move");
    this.slideIcon.classList.toggle("icon-rotate");

    this.isFormOpen = !this.isFormOpen;
    return this.isFormOpen;
  }
}
