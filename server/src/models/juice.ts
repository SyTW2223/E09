import {Document, Schema, model} from 'mongoose';
// import validator from 'validator';

export interface JuiceDocumentInterface extends Document {
  userName: string,
  text: string,
  date: string,
  likes: [string]
}

export const JuiceSchema = new Schema<JuiceDocumentInterface>({
  userName: {
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
    type: [String],
    default: [],
    required: false,
  }
});

export const Juice = model<JuiceDocumentInterface>('Juice', JuiceSchema);