import mongoose, { Schema } from 'mongoose';
import { MONGO_URI } from "$env/static/private";

// initialize database
mongoose.connect(MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});

export const User = mongoose.model('User', new Schema({
    email: String,
    password: String,
    username: String,
}, { timestamps: true }))

export const UserData = mongoose.model('UserData', new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    data: Object,
}, { timestamps: true }))

// example to link user and userdata 
// const user = await User.findOne({ email: 'test@test' })
// const userdata = await UserData.findOne({ user: user._id })