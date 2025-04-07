// app/types.ts
export interface Note {
  id: string;
  content: string;
}

export type RootStackParamList = {
  Home: undefined;
  NotePad: { noteId?: string };
  Library: undefined;
  Calendar: undefined;
};