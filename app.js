import express from "express";
import { connectToDatabase } from "./db.service.js";

const app = express();

connectToDatabase();

app.use(express.static("public"));

app.listen(3000, () => {
  console.log("App listening on port 3000");
});
