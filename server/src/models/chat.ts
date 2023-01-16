import {Document, Schema, model} from 'mongoose';
// https://attacomsian.com/blog/mongoose-schema-types
// import validator from 'validator';

export interface ChatDocumentInterface extends Document {
  usersId: number[],
  messagesId: number[],
}

export const ChatSchema = new Schema<ChatDocumentInterface>({
  usersId: {
    type: [Number],
    required: true,
  },
  messagesId: {
    type: [Number],
    required: true,
  },
});

export const Chat = model<ChatDocumentInterface>('Chat', ChatSchema);