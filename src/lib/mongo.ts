import mongoose from 'mongoose';
import { MONGO_URI } from "$env/static/private";

// initialize database
mongoose.connect(MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});