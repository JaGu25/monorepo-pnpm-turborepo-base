import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CreateNoteUseCase,
  DeleteNoteUseCase,
  GetNoteByIdUseCase,
  ListNotesUseCase,
  UpdateNoteUseCase,
} from '@repo/application';
import { NOTE_REPOSITORY, NoteRepository } from '@repo/domain';

import { NestNoteRepository } from './repositories/nest-note.repository';
import { NoteSchema } from './schemas/note.schema';
import { NotesController } from './notes.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Note', schema: NoteSchema }])],
  controllers: [NotesController],
  providers: [
    NestNoteRepository,
    {
      provide: NOTE_REPOSITORY,
      useExisting: NestNoteRepository,
    },
    {
      provide: CreateNoteUseCase,
      useFactory: (repository: NoteRepository) =>
        new CreateNoteUseCase(repository),
      inject: [NOTE_REPOSITORY],
    },
    {
      provide: UpdateNoteUseCase,
      useFactory: (repository: NoteRepository) =>
        new UpdateNoteUseCase(repository),
      inject: [NOTE_REPOSITORY],
    },
    {
      provide: DeleteNoteUseCase,
      useFactory: (repository: NoteRepository) =>
        new DeleteNoteUseCase(repository),
      inject: [NOTE_REPOSITORY],
    },
    {
      provide: GetNoteByIdUseCase,
      useFactory: (repository: NoteRepository) =>
        new GetNoteByIdUseCase(repository),
      inject: [NOTE_REPOSITORY],
    },
    {
      provide: ListNotesUseCase,
      useFactory: (repository: NoteRepository) =>
        new ListNotesUseCase(repository),
      inject: [NOTE_REPOSITORY],
    },
  ],
})
export class NotesModule {}
