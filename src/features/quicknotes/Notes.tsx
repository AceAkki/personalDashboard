import { useOutletContext } from "react-router-dom";
import { nanoid } from "nanoid";
import NotesForm from "./components/NotesForm";

import type { DashboardContext } from "../mainTypes";

const Notes = () => {
  const { notes, setNotes } = useOutletContext<DashboardContext>();

  console.log(notes);
  const RenderNotes = notes.map((note) => {
    return (
      <div className="note-wrap" key={nanoid()}>
        <p>{note.note}</p>
        <button
          onClick={() =>
            setNotes((prevNotes) =>
              prevNotes.filter((prevNote) => prevNote.id !== note.id),
            )
          }
        >
          X
        </button>
      </div>
    );
  });

  return (
    <>
      <section className="overflow-auto inner-route-section">
        <h1>Notes</h1>
        <div className="notes-form-wrap">
          <NotesForm setNotes={setNotes} />
        </div>
        <div className="notes-main-wrap">{RenderNotes}</div>
      </section>
    </>
  );
};

export default Notes;
