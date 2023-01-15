import mongoose, { Schema } from 'mongoose';
import { IProduct } from '../types/productType';

const productSchema = new Schema <IProduct>({
    image: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    amount: {type: Number, required: true},
    deletedPrice: { type: Number },
});

export default mongoose.model('Product', productSchema);