import { useShallow } from "zustand/shallow";
import { nanoid } from "nanoid";
import NotesForm from "./components/NotesForm";
import { useNoteStore } from "./hooks/useNoteStore";

const Notes = () => {
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
        <h1 className="section-title">Notes</h1>
        <div className="notes-form-wrap">
          <div>
            <NotesForm setNotes={updateNotes} />
          </div>
          <div>
            <button
              className="delete-notes-btn"
              onClick={() => clearAllNotes()}
            >
              Delete All Notes
            </button>
          </div>
        </div>
        <div className="notes-main-wrap">{RenderNotes}</div>
      </section>
    </>
  );
};

export default Notes;
