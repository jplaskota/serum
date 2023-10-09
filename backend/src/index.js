import cors from "cors";
import express from "express";
import notes from "./routes/notes.route.js";
import connectToDatabase from "./services/db.service.js";

const app = express();

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies

connectToDatabase()
  .then(() => {
    app.use("/notes", notes); // Mount notes router on /notes
  })
  .catch((err) => {
    console.log(err);
    process.exit();
  });

export default app; //for tests and server.js
