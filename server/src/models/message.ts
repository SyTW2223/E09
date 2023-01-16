import {Document, Schema, model} from 'mongoose';
// import validator from 'validator';

export interface MessageDocumentInterface extends Document {
  id: number,
  senderId: number,
  mesType: string,
  text: string,
  date: string,
}

export const MessageSchema = new Schema<MessageDocumentInterface>({
  id: {
    unique: true,
    type: Number,
    required: true,
  },
  senderId: {
    unique: true,
    type: Number,
    required: true,
  },
  mesType: {
    type: String,
    required: true,
    trim: true,
    enum: ['Image', 'Text'],
  },
  text: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: String,
    required: true,
    trim: true,
  },

});

export const Message = model<MessageDocumentInterface>('Message', MessageSchema);