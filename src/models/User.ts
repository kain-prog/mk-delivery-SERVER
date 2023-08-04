import mongoose, { Schema } from 'mongoose';
import { IUser } from '../types/userType';

const userSchema = new Schema <IUser>({
    image: { type: String },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    tel: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean,  default: false}
});

export default mongoose.model('User', userSchema);