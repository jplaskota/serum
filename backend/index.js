import dotenv from "dotenv";
import express from "express";
import notes from "./src/routes/notesRoutes.js";
import connectToDatabase from "./src/services/db.service.js";

dotenv.config();
const app = express();
app.use(express.json());

// now for test env
const port = process.env.SERVER_PORT || 3000;

connectToDatabase()
  .then(() => {
    app.get("/", notes);

    app.listen(port, () => {
      console.log(`Backend server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit();
  });
