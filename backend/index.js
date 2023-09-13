import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import notes from "./src/routes/notes.route.js";
import connectToDatabase from "./src/services/db.service.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Enable CORS for all routes
app.use(cors());

const port = process.env.SERVER_PORT || 3000;

connectToDatabase()
  .then(() => {
    app.use("/", notes);

    app.listen(port, () => {
      console.log(`Backend server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit();
  });

export default app; //for tests
