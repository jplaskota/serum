const navbar = document.getElementById("navbar");

class Tools {
  #_isFormOpen;

  constructor() {
    this.isFormOpen = false;
  }

  get isFormOpen() {
    return this.#_isFormOpen;
  }

  set isFormOpen(val) {
    this.#_isFormOpen = val;
  }

  NavbarColor() {
    if (this.#_isFormOpen) {
      navbar.style.top = "0";
    }

    if (window.scrollY === 0 || this.#_isFormOpen) {
      navbar.style.backgroundColor = "transparent";
      navbar.style.boxShadow = "none";
    } else {
      navbar.style.backgroundColor = "var(--background)";
      navbar.style.boxShadow = "0 0 10px var(--background)";
    }
  }
}

export default new Tools();

// ??? move search function to tools
