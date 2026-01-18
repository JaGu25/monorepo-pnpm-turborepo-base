import { Note, NoteRepository } from '@repo/domain';

export interface CreateNoteInput {
  title: string;
  content: string;
}

export interface CreateNoteOutput {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export class CreateNoteUseCase {
  constructor(private readonly noteRepository: NoteRepository) {}

  async execute(input: CreateNoteInput): Promise<CreateNoteOutput> {
    const note = Note.create({
      id: this.generateId(),
      title: input.title,
      content: input.content,
    });

    const created = await this.noteRepository.create(note);

    return {
      id: created.id,
      title: created.title,
      content: created.content,
      createdAt: created.createdAt,
      updatedAt: created.updatedAt,
    };
  }

  private generateId(): string {
    return crypto.randomUUID();
  }
}
