import axios from 'axios';
import type { Note, NoteTag } from '../types/note';

const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
axios.defaults.baseURL = 'https://notehub-public.goit.study/api/notes';
axios.defaults.headers.common.Authorization = `Bearer ${myKey}`;

interface NoteHttpRequest {
  notes: Note[];
  totalPages: number;
}

interface NewNoteContent {
  title: string;
  content: string;
  tag: NoteTag;
}

export const fetchNotes = async (
  search: string,
  page: number,
  tag?: string
): Promise<NoteHttpRequest> => {
  const params = {
    search,
    page,
    perPage: 12,
    tag,
  };

  const res = await axios.get<NoteHttpRequest>('', { params });
  console.log(res.data);

  return res.data;
};

export const createNote = async (newNote: NewNoteContent): Promise<Note> => {
  const res = await axios.post<Note>('', newNote);
  return res.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const res = await axios.delete<Note>(`/${id}`);
  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await axios.get<Note>(`/${id}`);
  return res.data;
};
