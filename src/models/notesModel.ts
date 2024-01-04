import mongoose from 'mongoose';

export interface Note extends mongoose.Document {
  title: string;
  content: string;
  author: mongoose.Schema.Types.ObjectId;
}

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    sharedWith: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

const NoteModel = mongoose.model('Note', schema);

export defautl NoteModel;