import { useState } from "react";
import { useShallow } from "zustand/shallow";
import { motion } from "motion/react";

import { useNoteStore } from "../hooks/useNoteStore";
import type { NoteType } from "../notesTypes";

import "./EditNoteForm.css";

const EditNoteForm = ({ noteObject }: { noteObject: NoteType }) => {
  const { editNote, setNoteID, toggleEditMode } = useNoteStore(
    useShallow((state) => ({
      editNote: state.editNote,
      setNoteID: state.setNoteID,
      toggleEditMode: state.toggleEditMode,
    })),
  );
  const [newNoteTxt, SetNewNoteTxt] = useState<string>(noteObject.note);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="edit-note-form"
    >
      <motion.div
        initial={{ scale: 0, opacity: 0, x: "-50%", y: "-50%" }}
        animate={{ scale: 1, opacity: 1, x: "-50%", y: "-50%" }}
        exit={{ scale: 0, opacity: 0, x: "-50%", y: "-50%" }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="edit-note-content"
      >
        <div>
          <textarea
            type="text"
            value={newNoteTxt}
            className="note-edit-area show"
            onChange={(e) => {
              SetNewNoteTxt(e.target.value);
            }}
          ></textarea>
        </div>
        <div className="btn-wrap">
          <button
            onClick={() => editNote({ id: noteObject.id, newNote: newNoteTxt })}
            className="confirm-btn"
          >
            Confirm
          </button>
          <button
            onClick={() => {
              setNoteID(null);
              toggleEditMode();
            }}
            className="cancel-btn"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EditNoteForm;
