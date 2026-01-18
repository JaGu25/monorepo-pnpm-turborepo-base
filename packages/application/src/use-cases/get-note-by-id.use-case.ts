import { NoteRepository } from '@repo/domain';

import { NoteNotFoundError } from './update-note.use-case';

export interface GetNoteByIdInput {
  id: string;
}

export interface GetNoteByIdOutput {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export class GetNoteByIdUseCase {
  constructor(private readonly noteRepository: NoteRepository) {}

  async execute(input: GetNoteByIdInput): Promise<GetNoteByIdOutput> {
    const note = await this.noteRepository.findById(input.id);

    if (!note) {
      throw new NoteNotFoundError(input.id);
    }

    return {
      id: note.id,
      title: note.title,
      content: note.content,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt,
    };
  }
}
