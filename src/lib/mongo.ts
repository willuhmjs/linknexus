import mongoose from 'mongoose';

// initialize database
mongoose.connect(process.env.MONGO_URI as string).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});