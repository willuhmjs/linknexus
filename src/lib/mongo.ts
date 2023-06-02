import mongoose, { Schema } from 'mongoose';
import { MONGO_URI } from "$env/static/private";

// initialize database
try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to database");
} catch (e) {
    console.error(e);
}

export const User = mongoose.model('User', new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    bio: { type: String, required: false },
    theme: { type: Number, required: true, default: 0 },
    links: [{
        title: { type: String, required: true },
        url: { type: String, required: true},
        icon: { type: String, required: false }
    }]
}, { timestamps: true }))