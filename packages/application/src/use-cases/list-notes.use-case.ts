import { NoteRepository } from '@repo/domain';

export interface ListNotesOutput {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export class ListNotesUseCase {
  constructor(private readonly noteRepository: NoteRepository) {}

  async execute(): Promise<ListNotesOutput[]> {
    const notes = await this.noteRepository.findAll();

    return notes.map((note) => ({
      id: note.id,
      title: note.title,
      content: note.content,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt,
    }));
  }
}
