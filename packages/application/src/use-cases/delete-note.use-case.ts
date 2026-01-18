import { NoteRepository } from '@repo/domain';

export interface DeleteNoteInput {
  id: string;
}

export class DeleteNoteUseCase {
  constructor(private readonly noteRepository: NoteRepository) {}

  async execute(input: DeleteNoteInput): Promise<void> {
    const existing = await this.noteRepository.findById(input.id);

    if (!existing) {
      return;
    }

    await this.noteRepository.delete(input.id);
  }
}
