import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { NoteType } from "../notesTypes";

interface useNoteStore {
  notes: NoteType[];
  deleteNote: (id: string) => void;
  updateNotes: (note: NoteType) => void;
  clearAllNotes: () => void;
}

const notesKey = "notes-storage";

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
