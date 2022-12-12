import {Document, Schema, model} from 'mongoose';
// import validator from 'validator';

export interface JuiceDocumentInterface extends Document {
  id: number,
  fatherId: number,
  userId: number,
  text: string,
  image: string,
  date: string,
  likes: number,
  squeezes: number,
  idOfResponses: number[]
}

export const JuiceSchema = new Schema<JuiceDocumentInterface>({
  id: {
    type: Number,
    unique: true,
    required: true,
  },
  fatherId: {
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
  image: {
    type: String,
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
  },
  squeezes: {
    type: Number,
    default: 0,
    required: true,
  },
  idOfResponses: {
    type: [Number]
  },
});

export const Juice = model<JuiceDocumentInterface>('Juice', JuiceSchema);