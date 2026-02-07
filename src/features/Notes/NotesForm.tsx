import { useState, useRef } from "react";
import type { stringSet } from "../mainTypes";
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
    }, 500);
  };

  const updateNote = (value: string) => {
    setNotes((prevNotes) => [...prevNotes, value]);
  };

  return (
    <textarea
      name="note"
      id="note"
      value={note}
      onChange={handleChange}
    ></textarea>
  );
};

export default NotesForm;
