import { useState, useRef } from "react";
import type { stringSet } from "../mainTypes";

import "./notes.css";
const NotesForm = ({ setNotes }: stringSet) => {
  const [note, setNote] = useState("");
  const timeoutRef = useRef<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setNote(value);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      updateNote(value);
    }, 10000);
  };

  const updateNote = (value: string) => {
    setNotes((prevNotes) => [...prevNotes, value]);
    setNote("");
  };

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
