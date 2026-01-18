import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note, NoteRepository } from '@repo/domain';

interface NoteDocument {
  _id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class NestNoteRepository implements NoteRepository {
  constructor(
    @InjectModel('Note') private readonly noteModel: Model<NoteDocument>
  ) {}

  async create(note: Note): Promise<Note> {
    const document = await this.noteModel.create({
      _id: note.id,
      title: note.title,
      content: note.content,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt,
    });
    return this.toDomain(document);
  }

  async findById(id: string): Promise<Note | null> {
    const document = await this.noteModel.findById(id);
    if (!document) {
      return null;
    }
    return this.toDomain(document);
  }

  async findAll(): Promise<Note[]> {
    const documents = await this.noteModel.find().sort({ createdAt: -1 });
    return documents.map((doc) => this.toDomain(doc));
  }

  async update(note: Note): Promise<Note> {
    const document = await this.noteModel.findByIdAndUpdate(
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

    return this.toDomain(document);
  }

  async delete(id: string): Promise<void> {
    await this.noteModel.findByIdAndDelete(id);
  }

  private toDomain(document: NoteDocument): Note {
    return new Note({
      id: document._id,
      title: document.title,
      content: document.content,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    });
  }
}
