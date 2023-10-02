import { AddNote, DeleteNote, EditNote } from "./notes.crud";
import RefreshNotes from "./notes.refresh";
import tools from "./tools";

const title = document.getElementById("new-title"),
  content = document.getElementById("new-content"),
  addBtn = document.getElementById("add-btn"),
  editBtn = document.getElementById("edit-btn"),
  noteForm = document.querySelector("[data-noteForm]"),
  notesContainer = document.querySelector("[data-notesContainer]"),
  slideBtn = document.querySelector("[data-slideBtn]"),
  slideIcon = slideBtn.querySelector("i"),
  deleteBtn = document.getElementById("delete-btn");

class NoteFormPanel {
  constructor() {
    this.noteForm = noteForm;
    this.notesContainer = notesContainer;
    this.slideBtn = slideBtn;
    this.slideIcon = slideIcon;
    this.addBtn = addBtn;
    this.editBtn = editBtn;
    this.deleteBtn = deleteBtn;
    this.title = title;
    this.content = content;
    this.isFormOpen = false;
    this.SetupButtonsListeners();
    this.SetupKeysListeners();
  }

  SetupButtonsListeners() {
    this.addBtn.onclick = () => {
      console.log("addBtn clicked");
      this.#Add();
    };

    this.editBtn.onclick = () => {
      console.log("editBtn clicked");
      this.#Edit();
    };

    this.deleteBtn.onclick = () => {
      console.log("deleteBtn clicked");
      this.#Delete();
    };
  }

  // FIXME shortcut key
  SetupKeysListeners() {
    document.onkeydown = (e) => {
      if (
        e.key === "Backspace" &&
        document.activeElement !== this.title &&
        document.activeElement !== this.content &&
        this.data !== undefined
      ) {
        this.Slide();
      }
    };
  }

  Open(data) {
    this.data = data; // Store the data when opening the form
    this.title.textContent = "";
    this.content.textContent = "";

    //FIXME before its working w/o this
    this.SetupButtonsListeners();

    this.addBtn.style.display = "none";
    this.editBtn.style.display = "none";
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
    this.title.oninput = () => this.#IsChange();
    this.content.oninput = () => this.#IsChange();

    this.Slide();
  }

  // TODO openWithData(data) { }

  #IsChange() {
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
  async #Add() {
    await AddNote(this.title.textContent, this.content.textContent).catch(
      (err) => {
        console.error("Add action Error: " + err);
        return;
      }
    );

    RefreshNotes();
    console.log("Note added");
    this.Slide();
  }

  // Btn to edit note
  async #Edit() {
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
    this.Slide();
  }

  // Btn to delete note
  async #Delete() {
    if (!this.data) {
      console.error("Data not available for delete.");
      return;
    }

    await DeleteNote(this.data._id).catch((err) => {
      console.log("Delete action error: " + err);
      return;
    });

    RefreshNotes();
    this.Slide();
  }

  // Function to slide between notes-container and form
  Slide() {
    this.noteForm.classList.toggle("form-slide");
    this.notesContainer.classList.toggle("notes-slide");
    this.slideBtn.classList.toggle("icon-move");
    this.slideIcon.classList.toggle("icon-rotate");
    this.isFormOpen = !this.isFormOpen;
    tools.isFormOpen = this.isFormOpen;
    tools.NavbarColor();
  }
}

export default new NoteFormPanel();
