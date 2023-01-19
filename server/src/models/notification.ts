import {Document, Schema, model} from 'mongoose';
// import validator from 'validator';

export interface NotificationDocumentInterface extends Document {
  notType: string,
  idUsers: number[],
  text: string,
  link: string,
}

export const NotificationSchema = new Schema<NotificationDocumentInterface>({
  notType: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    enum: ['Ad', 'Messagge', 'Like', 'Squeeze'],
  },
  idUsers: {
    type: [Number],
    required: true,
  },
  text: {
    type: String,
    required: true,
    trim: true,
  },
  link: {
    type: String,
    required: true,
    trim: true,
  },

});

export const Notification = model<NotificationDocumentInterface>('Notification', NotificationSchema);