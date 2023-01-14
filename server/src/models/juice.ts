import {Document, Schema, model} from 'mongoose';
// import validator from 'validator';

export interface JuiceDocumentInterface extends Document {
  userId: string,
  text: string,
  date: string,
  likes: number
}

export const JuiceSchema = new Schema<JuiceDocumentInterface>({
  userId: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: String,
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