import { Note } from '../entities/note.entity';

export interface NoteRepository {
  create(note: Note): Promise<Note>;
  findById(id: string): Promise<Note | null>;
  findAll(): Promise<Note[]>;
  update(note: Note): Promise<Note>;
  delete(id: string): Promise<void>;
}

export const NOTE_REPOSITORY = Symbol('NoteRepository');
