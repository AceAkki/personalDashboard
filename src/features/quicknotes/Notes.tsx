import { useOutletContext } from "react-router-dom";
import { useShallow } from "zustand/shallow";
import { nanoid } from "nanoid";
import NotesForm from "./components/NotesForm";
import { useNoteStore } from "./hooks/useNoteStore";

import type { DashboardContext } from "../mainTypes";
import type { NoteType } from "./notesTypes";

const Notes = () => {
  // const { notes, setNotes } = useOutletContext<DashboardContext>();

  const { notes, deleteNote, updateNotes, clearAllNotes } = useNoteStore(
    useShallow((state) => ({
      notes: state.notes,
      deleteNote: state.deleteNote,
      updateNotes: state.updateNotes,
      clearAllNotes: state.clearAllNotes,
    })),
  );

  const RenderNotes = notes.map((note) => {
    return (
      <div className="note-wrap" key={nanoid()}>
        <p>{note.note}</p>
        <button onClick={() => deleteNote(note.id)}>X</button>
      </div>
    );
  });

  return (
    <>
      <section className="overflow-auto inner-route-section">
        <h1>Notes</h1>
        <div className="notes-form-wrap">
          <NotesForm setNotes={updateNotes} />
        </div>
        <div className="notes-main-wrap">{RenderNotes}</div>
      </section>
    </>
  );
};

export default Notes;
