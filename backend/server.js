import colors from "colors";
import app from "./src";

const port = Bun.env.PORT || 3000;

app.listen(port, () => {
  console.clear();
  console.log(colors.green("\nSERUM Backend started\n"));
  console.log("➜".green + ` Port: ${port}`);
});
