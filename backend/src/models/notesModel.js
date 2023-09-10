import mongoose from "mongoose";
import { nanoid } from "nanoid";

const schema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: nanoid(),
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
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
