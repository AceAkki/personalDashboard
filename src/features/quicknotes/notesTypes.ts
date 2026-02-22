export interface NoteType {
  note: string;
  id: string;
}

export type NotesSet = (note: NoteType) => void;

export interface NotesPropsContext {
  notes: NoteType[];
  setNotes: NotesSet;
}
