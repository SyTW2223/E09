import {Document, Schema, model} from 'mongoose';
import validator from 'validator';

export interface UserDocumentInterface extends Document {
  name: string,
  email: string,
  password: string,
  description: string,
  following: number,
  followers: number,
  likes: number,
  age: number,
}

export const UserSchema = new Schema<UserDocumentInterface>({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    validate: (value: string) => {
      if (!validator.isEmail(value)) {
        throw new Error('Email not valid');
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    //validate: (value: string) => {
      //if (!validator.isStrongPassword(value)) {
      //  throw new Error('Must be a strong password');
    //  }
    //},
  },
  description: {
    type: String,
    default: "",
    unique: false,
    required: false,
    trim: true,
  },
  following: {
    type: Number,
    default: 0,
    required: true,
  },
  followers: {
    type: Number,
    default: 0,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
    required: true,
  },
  age: {
    type: Number,
    required: false,
  },
});

export const User = model<UserDocumentInterface>('User', UserSchema);