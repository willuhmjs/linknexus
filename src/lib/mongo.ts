import { config } from 'dotenv';
config();
import mongoose from 'mongoose';

// initialize database
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});