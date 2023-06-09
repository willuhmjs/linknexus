import mongoose, { Schema } from 'mongoose';
import { MONGO_URI } from '$config';
import type Theme from '$lib/theme';
export const connect = async () => {
	await mongoose.connect(MONGO_URI);
	console.log('connected to mongo');
};

export const User = mongoose.model<IUser>(
	'User',
	new Schema(
		{
			email: { type: String, required: true, unique: true },
			password: { type: String, required: true },
			username: { type: String, required: true, unique: true },
			bio: { type: String, required: false },
			theme: { type: Number, required: true, default: 0 },
			links: [
				{
					title: { type: String, required: true, unique: true },
					url: { type: String, required: true },
					icon: { type: String, required: false }
				}
			]
		},
		{ timestamps: true }
	)
);

export interface IUser extends mongoose.Document {
	email: string;
	password: string;
	username: string;
	bio?: string;
	theme: Theme;
	links: {
		title: string;
		url: string;
		icon?: string;
	}[];
}
