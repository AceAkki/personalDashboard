import useNoteMain from "../hooks/useNoteMain";
import type { NotesSet } from "../notesTypes";

import "./../notes.css";
const NotesForm = ({ setNotes }: { setNotes: NotesSet }) => {
  const { note, handleChange } = useNoteMain(setNotes);
  return (
    <textarea
      name="note"
      id="note"
      value={note.note}
      onChange={handleChange}
      className="notes-textarea"
      placeholder="Whats on your mind..."
    ></textarea>
  );
};

export default NotesForm;
