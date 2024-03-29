import {Document, Schema, model} from 'mongoose';
import validator from 'validator';

export interface UserDocumentInterface extends Document {
  name: string,
  email: string,
  password: string,
  following: [string],
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
    validate: (value: string) => {
      if (!validator.isStrongPassword(value, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0})) {
        throw new Error('Must be a strong password');
      }
    },
  },
  following: {
    type: [String],
    default: [],
    required: false,
  },
});

export const User = model<UserDocumentInterface>('User', UserSchema);