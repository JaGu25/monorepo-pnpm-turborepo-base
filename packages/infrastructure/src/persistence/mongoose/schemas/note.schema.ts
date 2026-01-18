import { Schema, model } from 'mongoose';

export interface NoteDocument {
  _id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const noteSchema = new Schema<NoteDocument>(
  {
    _id: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  {
    timestamps: true,
    _id: false,
  }
);

export const NoteModel = model<NoteDocument>('Note', noteSchema);
