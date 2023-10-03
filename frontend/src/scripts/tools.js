const navbar = document.getElementById("navbar");

// Define a class named Tools for handling various utility functions
class Tools {
  #_isFormOpen; // Private variable to track if the form is open

  constructor() {
    this.isFormOpen = false;
  }

  get isFormOpen() {
    return this.#_isFormOpen;
  }

  set isFormOpen(val) {
    this.#_isFormOpen = val;
  }

  // Function to adjust the navbar's appearance based on the form's open state and scroll position
  NavbarColor() {
    if (this.#_isFormOpen) {
      navbar.style.top = "0"; // Move the navbar to the top if the form is open
    }

    if (window.scrollY === 0 || this.#_isFormOpen) {
      // Check if the page is scrolled to the top or if the form is open
      navbar.style.backgroundColor = "transparent";
      navbar.style.boxShadow = "none";
    } else {
      // If the page is scrolled and the form is closed
      navbar.style.backgroundColor = "var(--background)";
      navbar.style.boxShadow = "0 0 10px var(--background)";
    }
  }
}

export default new Tools();
