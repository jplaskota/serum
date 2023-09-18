import { FindNoteByText } from "./notes.crud";
import RefreshNotes from "./notes.refresh";

export default async function SearchNotes(text) {
  const data = await FindNoteByText(text);
  RefreshNotes(data);
}
