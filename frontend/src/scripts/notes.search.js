import { FindNoteByText } from "./notes.crud";
import RefreshNotes from "./notes.refresh";

// Define a function to search for notes based on text input
export default async function SearchNotes(text) {
  const data = await FindNoteByText(text);
  RefreshNotes(data);
}
