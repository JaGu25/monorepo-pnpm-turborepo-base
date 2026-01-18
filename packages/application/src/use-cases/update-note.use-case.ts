import { NoteRepository } from '@repo/domain';

export interface UpdateNoteInput {
  id: string;
  title?: string;
  content?: string;
}

export interface UpdateNoteOutput {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export class NoteNotFoundError extends Error {
  constructor(id: string) {
    super(`Note with id ${id} not found`);
    this.name = 'NoteNotFoundError';
  }
}

export class UpdateNoteUseCase {
  constructor(private readonly noteRepository: NoteRepository) {}

  async execute(input: UpdateNoteInput): Promise<UpdateNoteOutput> {
    const existing = await this.noteRepository.findById(input.id);

    if (!existing) {
      throw new NoteNotFoundError(input.id);
    }

    const updated = existing.update({
      title: input.title,
      content: input.content,
    });

    const saved = await this.noteRepository.update(updated);

    return {
      id: saved.id,
      title: saved.title,
      content: saved.content,
      createdAt: saved.createdAt,
      updatedAt: saved.updatedAt,
    };
  }
}
