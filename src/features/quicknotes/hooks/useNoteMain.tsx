import { useState, useRef } from "react";
import type { stringSet } from "../../mainTypes";
const useNoteMain = ({ setNotes }: stringSet) => {
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
    }, 4000);
  };

  const updateNote = (value: string) => {
    setNotes((prevNotes: string[]) => [...prevNotes, value]);
    setNote("");
  };

  return {
    note,
    handleChange,
  };
};

export default useNoteMain;
