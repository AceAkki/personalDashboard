import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { NoteType } from "../notesTypes";
// notes key for local storage
import { notesKey } from "../../../global/storageKeys";

// notes store type
interface useNoteStore {
  notes: NoteType[];
  deleteNote: (id: string) => void;
  updateNotes: (note: NoteType) => void;
  clearAllNotes: () => void;
}



export const useNoteStore = create<useNoteStore>()(
  persist(
    (set) => ({
      notes: [],
      deleteNote: (id) =>
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id),
        })),
      updateNotes: (note) =>
        set((state) => ({ notes: [...state.notes, note] })),
      clearAllNotes: () => {
        set({ notes: [] });
        localStorage.removeItem(notesKey);
      },
    }),
    { name: notesKey }, // localStorage key)
  ),
);
