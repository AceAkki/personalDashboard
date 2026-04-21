import { useState } from "react";
import { useShallow } from "zustand/shallow";
import { motion } from "motion/react";

import { useNoteStore } from "../hooks/useNoteStore";
import type { NoteType } from "../notesTypes";

import "./EditNoteForm.css";

const EditNoteForm = ({ noteObject }: { noteObject: NoteType }) => {
  const { editNote, toggleEditMode } = useNoteStore(
    useShallow((state) => ({
      editNote: state.editNote,
      toggleEditMode: state.toggleEditMode,
    })),
  );
  const [newNoteTxt, SetNewNoteTxt] = useState<string>(noteObject.note);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="edit-task-form"
    >
      <motion.div
        initial={{ scale: 0, opacity: 0, x: "-50%", y: "-50%" }}
        animate={{ scale: 1, opacity: 1, x: "-50%", y: "-50%" }}
        exit={{ scale: 0, opacity: 0, x: "-50%", y: "-50%" }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="edit-Note-content"
      >
        <div>
          <input
            type="text"
            value={newNoteTxt}
            className="note-edit show"
            onChange={(e) => {
              SetNewNoteTxt(e.target.value);
            }}
          />
        </div>
        <div className="btn-wrap">
          <button
            onClick={() => editNote({ id: noteObject.id, newNote: newNoteTxt })}
            className="confirm-btn"
          >
            Confirm
          </button>
          <button onClick={() => toggleEditMode()} className="cancel-btn">
            Cancel
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EditNoteForm;
