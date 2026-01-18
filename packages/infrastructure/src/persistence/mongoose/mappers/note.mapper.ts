import { Note } from '@repo/domain';

import { NoteDocument } from '../schemas/note.schema';

export class NoteMapper {
  static toDomain(document: NoteDocument): Note {
    return new Note({
      id: document._id,
      title: document.title,
      content: document.content,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    });
  }

  static toPersistence(note: Note): Record<string, unknown> {
    return {
      _id: note.id,
      title: note.title,
      content: note.content,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt,
    };
  }
}
