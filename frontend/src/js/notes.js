const url = "http://localhost:3000/";

// Function to get all notes
export function getNotes() {
  fetch(url, { method: "GET" })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Network response was not ok: ${res.status}`);
      }
      return res.json();
    })
    .catch((err) => {
      console.error("Fetch error:", err);
    });
}

// Function to get a note by ID
export function getNoteById(_id) {
  fetch(url + _id, { method: "GET" })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Network response was not ok: ${res.status}`);
      }
      return res.json();
    })
    .catch((err) => {
      console.error("Fetch error:", err);
    });
}

// Function to add a new note
export function addNote(_title, _content) {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: _title,
      content: _content,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Network response was not ok: ${res.status}`);
      }
      return res.json();
    })
    .catch((err) => {
      console.error("Fetch error:", err);
    });
}

// Function to edit an existing note
export function editNote(_id, _title, _content) {
  fetch(url + _id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: _title,
      content: _content,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Network response was not ok: ${res.status}`);
      }
      return res.json();
    })
    .catch((err) => {
      console.error("Fetch error:", err);
    });
}

// Function to delete a note
export function deleteNote(_id) {
  fetch(url + _id, { method: "DELETE" })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Network response was not ok: ${res.status}`);
      }
      return res.json();
    })
    .catch((err) => {
      console.error("Fetch error:", err);
    });
}

// TODO alert function from main.js to display error / notification
// TODO auth token
