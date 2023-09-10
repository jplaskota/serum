import express from "express";
import Note from "../models/notesModel.js";

const router = express.Router();
export default router;

router.use(express.json());

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
