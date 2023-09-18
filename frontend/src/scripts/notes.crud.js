const url = "http://localhost:3000/";

// Function to get all notes
export async function getNotes() {
  try {
    const res = await fetch(url);

    if (!res.ok) throw new Error(`Network response was not ok: ${res.status}`);

    return await res.json();
  } catch (err) {
    console.error("Fetch error:", err);
    throw err;
  }
}

// Function to get a note by ID
export async function getNoteById(id) {
  try {
    const res = await fetch(url + id);

    if (!res.ok) throw new Error(`Network response was not ok: ${res.status}`);

    return await res.json();
  } catch (err) {
    console.error("Fetch error:", err);
    throw err;
  }
}

// Function to add a new note
export async function addNote(title, content) {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
      }),
    });

    if (!res.ok) throw new Error(`Network response was not ok: ${res.status}`);

    return res.json();
  } catch (err) {
    console.error("Fetch error:", err);
    throw err;
  }
}

// Function to edit an existing note
export async function editNote(id, title, content) {
  try {
    const res = await fetch(url + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
      }),
    });

    if (!res.ok) throw new Error(`Network response was not ok: ${res.status}`);

    return res.json();
  } catch (err) {
    console.error("Fetch error:", err);
    throw err;
  }
}

// Function to delete a note
export async function deleteNote(id) {
  try {
    const res = await fetch(url + id, { method: "DELETE" });
    if (!res.ok) throw new Error(`Network response was not ok: ${res.status}`);

    return res.status;
  } catch (err) {
    console.error("Fetch error:", err);
    throw err;
  }
}

// TODO status text from backend
// TODO alert function from main.js to display error / notification
// TODO auth token
