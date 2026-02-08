import { useOutletContext } from "react-router-dom";

import type { DashboardContext } from "../mainTypes";
const Notes = () => {
  const { notes } = useOutletContext<DashboardContext>();

  const RenderNotes = notes.map((note) => {
    return (
      <div className="note-wrap">
        <p>{note}</p>
      </div>
    );
  });

  return (
    <>
      <h1>Notes</h1>
      <div className="notes-main-wrap">{RenderNotes}</div>
    </>
  );
};

export default Notes;
