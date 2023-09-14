import express from "express";
import Note from "../models/notes.model.js";

const router = express.Router();
export default router;

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

// GET route to fetch all notes
router.get("/", async (req, res) => {
  try {
    await Note.find()
      .then((notes) => {
        res.status(200).send(notes);
      })
      .catch((err) => {
        console.error("Error fetching notes:", err);
      });
  } catch (err) {
    console.error(err);
  }
});

// GET route to fetch a single note by ID
router.get("/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).send("Note not found");
    }

    res.status(200).send(note);
  } catch (err) {
    console.error("Error fetching note:", err);
    res.status(500).send("Internal Server Error");
  }
});

// TODO create route to fetch by text inside title or content

// POST route to create a new note
router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title && !content) {
      return res.status(400).send("Title or content are required");
    }

    const newNote = new Note({
      title,
      content,
    });

    await newNote.save();

    res.status(201).send(newNote);
  } catch (err) {
    console.error("Error creating note:", err);
    res.status(500).send("Internal Server Error", err);
  }
});

// PUT route to update a note by ID
router.put("/:id", async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title && !content) {
      return res.status(400).send("Title or content are required");
    }

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).send("Note not found");
    }

    res.status(200).send(updatedNote);
  } catch (err) {
    console.error("Error updating note:", err);
    res.status(500).send("Internal Server Error");
  }
});

// DELETE route to delete a note by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndRemove(req.params.id);

    if (!deletedNote) {
      return res.status(404).send("Note not found");
    }

    res.status(204).send();
  } catch (err) {
    console.error("Error deleting note:", err);
    res.status(500).send("Internal Server Error");
  }
});
