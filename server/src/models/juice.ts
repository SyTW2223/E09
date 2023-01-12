import {Document, Schema, model} from 'mongoose';
// import validator from 'validator';

export interface JuiceDocumentInterface extends Document {
  id: number,
  userId: number,
  text: string,
  date: string,
  likes: number
}

export const JuiceSchema = new Schema<JuiceDocumentInterface>({
  id: {
    type: Number,
    unique: true,
    required: true,
  },
  userId: {
    type: Number,
    unique: true,
    required: true,
  },
  text: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: String,
    unique: false,
    required: false,
    trim: true,
  },
  likes: {
    type: Number,
    default: 0,
    required: false,
  }
});

export const Juice = model<JuiceDocumentInterface>('Juice', JuiceSchema);