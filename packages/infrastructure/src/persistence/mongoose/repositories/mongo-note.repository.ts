import { Note, NoteRepository } from '@repo/domain';

import { NoteMapper } from '../mappers/note.mapper';
import { NoteModel } from '../schemas/note.schema';

export class MongoNoteRepository implements NoteRepository {
  async create(note: Note): Promise<Note> {
    const document = await NoteModel.create(NoteMapper.toPersistence(note));
    return NoteMapper.toDomain(document);
  }

  async findById(id: string): Promise<Note | null> {
    const document = await NoteModel.findById(id);
    if (!document) {
      return null;
    }
    return NoteMapper.toDomain(document);
  }

  async findAll(): Promise<Note[]> {
    const documents = await NoteModel.find().sort({ createdAt: -1 });
    return documents.map(NoteMapper.toDomain);
  }

  async update(note: Note): Promise<Note> {
    const document = await NoteModel.findByIdAndUpdate(
      note.id,
      {
        title: note.title,
        content: note.content,
        updatedAt: note.updatedAt,
      },
      { new: true }
    );

    if (!document) {
      throw new Error(`Note with id ${note.id} not found`);
    }

    return NoteMapper.toDomain(document);
  }

  async delete(id: string): Promise<void> {
    await NoteModel.findByIdAndDelete(id);
  }
}
