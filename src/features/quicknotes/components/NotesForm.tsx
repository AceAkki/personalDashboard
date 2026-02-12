import useNoteMain from "../hooks/useNoteMain";
import type { stringSet } from "../../mainTypes";

import "./../notes.css";
const NotesForm = ({ setNotes }: stringSet) => {
  const { note, handleChange } = useNoteMain({ setNotes });
  return (
    <textarea
      name="note"
      id="note"
      value={note}
      onChange={handleChange}
      className="notes-textarea"
      placeholder="Whats on your mind..."
    ></textarea>
  );
};

export default NotesForm;
