import mongoose, { Schema } from 'mongoose';
import { MONGO_URI } from '$config';
import { BackgroundType, ButtonStyle, Font, SpecialLink, type IUser } from '$lib/types';
export const connect = async () => {
	await mongoose.connect(MONGO_URI);
	console.log('connected to mongo');
};

const userSchema = new Schema(
	{
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		username: { type: String, required: true, unique: true },
		bio: { type: String, required: false },
		theme: {
			background: {
				type: { type: Number, required: true, default: 0, enum: BackgroundType },
				color: { type: String, required: true, default: '#000000' },
			},
			button: {
				radius: { type: Number, required: true, default: 0, min: 0, max: 100 },
				style: { type: Number, required: true, default: 0, enum: ButtonStyle },
				// backgroundColor applies to both border and background colors
				color: { type: String, required: true, default: '#000000' },
				fontColor: { type: String, required: true, default: '#000000' },
			},
			font: { type: Number, required: true, default: 0, enum: Font },
			// fontColor is overriden by button.fontColor
			fontColor: { type: String, required: true, default: '#000000' },
		},
		links: [
			{
				title: { type: String, required: true },
				url: { type: String, required: true },
			}
		],
		specials: [
			{
				type: { type: Number, required: true, enum: SpecialLink },
				username: { type: String, required: true }
			}
		]
	},
	{ timestamps: true }
);

export const User = mongoose.model<IUser>('User', userSchema);
