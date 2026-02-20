export interface NoteType {
  note: string;
  id: string;
}

export type NotesSet = React.Dispatch<React.SetStateAction<NoteType[]>>;

export interface NotesPropsContext {
  notes: NoteType[];
  setNotes: NotesSet;
}
