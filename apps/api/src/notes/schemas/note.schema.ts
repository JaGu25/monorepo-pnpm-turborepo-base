import { Schema } from 'mongoose';

export const NoteSchema = new Schema(
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
