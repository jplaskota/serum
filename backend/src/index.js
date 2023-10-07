import colors from "colors";
import cors from "cors";
import express from "express";
import notes from "./routes/notes.route.js";
import connectToDatabase from "./services/db.service.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Enable CORS for all routes
app.use(cors());

const port = Bun.env.SERVER_PORT || 3000;

connectToDatabase()
  .then(() => {
    app.use("/", notes);

    app.listen(port, () => {
      console.clear();
      console.log(colors.green("\nServer started\n"));
      console.log("➜".green + ` Port: ${port}`);
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit();
  });

export default app; //for tests
