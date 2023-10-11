import colors from "colors";
import dotenv from "dotenv";
import app from "./src/index.js";

dotenv.config();

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.clear();
  console.log("\nSERUM Backend started\n".green);
  console.log("➜".green + ` Port: ${port}`);
});
