import { useState, useRef } from "react";
import { nanoid } from "nanoid";
import type { NoteType, NotesSet } from "../notesTypes";

const useNoteMain = (setNotes: NotesSet) => {
  const [note, setNote] = useState<NoteType>({ note: "", id: "" });
  const timeoutRef = useRef<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setNote({ note: value, id: nanoid() });

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      updateNote({ note: value, id: nanoid() });
    }, 4000);
  };

  const updateNote = ({ note, id }: NoteType) => {
    console.log(note, id);
    setNotes({ note: note, id: id });
    setNote({ note: "", id: "" });
  };

  return {
    note,
    handleChange,
  };
};

export default useNoteMain;
