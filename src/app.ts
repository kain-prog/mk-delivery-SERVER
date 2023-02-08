import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

export const app = express();

// Connection Mongoose
mongoose.set('strictQuery', true);
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_DB}.lhmqcxe.mongodb.net/?retryWrites=true&w=majority`, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Mongo Connected');
    }
});

app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cors({exposedHeaders: 'auth-token'}));