import mongoose from "mongoose";
import { nanoid } from "nanoid";

// TODO title and content "required" test

const schema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: nanoid(),
    },
    title: {
      type: String,
      required: false,
    },
    content: {
      type: String,
      required: false,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    versionKey: false,
  }
);

const Note = new mongoose.model("note", schema);

export default Note;
