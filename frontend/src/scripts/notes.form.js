import { AddNote, DeleteNote, EditNote } from "./notes.crud";
import RefreshNotes from "./notes.refresh";
import Tools from "./tools";

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
  #note; // Private variable to store the current note
  #submit; // Private variable to track if the form is ready for submission

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
    this.SetupButtonsListeners();
    this.SetupKeysListeners();
  }

  // Set up event listeners for buttons
  SetupButtonsListeners() {
    this.addBtn.onclick = () => {
      this.#Add();
    };

    this.editBtn.onclick = () => {
      this.#Edit();
    };

    this.deleteBtn.onclick = () => {
      if (this.#note !== undefined) {
        this.#Delete();
      } else {
        this.#Close();
      }
    };
  }

  // Set up event listeners for keyboard input
  SetupKeysListeners() {
    document.onkeydown = (e) => {
      if (
        e.key === "Backspace" &&
        document.activeElement !== this.title &&
        document.activeElement !== this.content &&
        Tools.isFormOpen
      ) {
        this.#Close();
      }

      if (
        e.key === "Enter" &&
        document.activeElement !== this.title &&
        document.activeElement !== this.content &&
        Tools.isFormOpen &&
        this.#submit
      ) {
        this.btn.click();
      }
    };
  }

  // Private method to open the form with data
  #Open(data) {
    this.#note = data; // Store the data when opening the form
    this.title.textContent = "";
    this.content.textContent = "";

    this.addBtn.style.display = "none";
    this.editBtn.style.display = "none";
    this.deleteBtn.style.display = "none";
    this.title.focus();

    this.btn = addBtn;
    if (this.#note !== undefined) {
      this.btn = editBtn;
      this.title.textContent = data.title || "";
      this.content.textContent = data.content || "";
      this.deleteBtn.style.display = "flex";
      this.title.blur();
    }

    this.oldTitle = this.title.textContent;
    this.oldContent = this.content.textContent;

    // When text is changed, icons (add or edit | delete) are displayed
    this.title.oninput = () => this.#IsChange();
    this.content.oninput = () => this.#IsChange();

    this.#Slide();
  }

  // Private method to check if there are changes in the form
  #IsChange() {
    this.btn.style.display = "none";
    this.deleteBtn.style.display = "none";
    this.#submit = false;

    if (
      (this.oldTitle !== this.title.textContent ||
        this.oldContent !== this.content.textContent) &&
      (this.title.textContent.length > 0 || this.content.textContent.length > 0)
    ) {
      this.btn.style.display = "flex";
      this.#submit = true;
    }

    if (
      this.title.textContent.length > 0 ||
      this.content.textContent.length > 0 ||
      this.#note !== undefined
    ) {
      this.deleteBtn.style.display = "flex";
    }
  }

  // Private method to add a new note
  async #Add() {
    await AddNote(this.title.textContent, this.content.textContent).catch(
      (err) => {
        console.error("Add action Error: " + err);
        return;
      }
    );

    RefreshNotes();
    console.log("Note added");
    this.#Close();
  }

  // Private method to edit a note
  async #Edit() {
    if (!this.#note) {
      console.error("Data not available for edit.");
      return;
    }

    await EditNote(
      this.#note._id,
      this.title.textContent,
      this.content.textContent
    ).catch((err) => {
      console.error("Edit action error: " + err);
      return;
    });

    RefreshNotes();
    console.log("Note edited");
    this.#Close();
  }

  // Private method to delete a note
  async #Delete() {
    if (!this.#note) {
      console.error("Data not available for delete.");
      return;
    }

    await DeleteNote(this.#note._id).catch((err) => {
      console.log("Delete action error: " + err);
      return;
    });

    RefreshNotes();
    console.log("Note deleted");
    this.#Close();
  }

  // Private method to close the form
  #Close() {
    this.#note = undefined;
    this.title.textContent = "";
    this.content.textContent = "";
    this.#Slide();
  }

  // Method to toggle the form
  Toggle(data) {
    if (Tools.isFormOpen) {
      this.#Close();
    } else {
      this.#Open(data);
    }
  }

  // Private method to slide between notes-container and form
  #Slide() {
    this.noteForm.classList.toggle("form-slide");
    this.notesContainer.classList.toggle("notes-slide");
    this.slideBtn.classList.toggle("icon-move");
    this.slideIcon.classList.toggle("icon-rotate");
    Tools.isFormOpen = !Tools.isFormOpen;
    Tools.NavbarColor();
  }
}

export default new NoteFormPanel();
