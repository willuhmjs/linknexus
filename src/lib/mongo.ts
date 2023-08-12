import mongoose, { Schema } from 'mongoose';
import { MONGO_URI } from '$config';
import { BackgroundType, ButtonStyle, Font, SpecialLink, Display, type IUser } from '$lib/types';
export const connect = async () => {
	await mongoose.connect(MONGO_URI);
	console.log('connected to mongo');
};

const userSchema = new Schema(
	{
		email: { type: String, required: true, unique: true, maxLength: 100 },
		password: { type: String, required: true, maxLength: 100 },
		username: { type: String, required: true, unique: true, maxLength: 100 },
		bio: { type: String, required: false, maxLength: 100 },
		meta: {
			title: { type: String, required: false, maxLength: 60, default: '' },
			description: { type: String, required: false, maxLength: 160, default: '' },
			color: { type: String, required: false, maxLength: 100, default: '#333333' },
			image: { type: String, required: false, maxLength: 300, default: '' }
		},
		// whether or not to use standard or grid mode
		theme: {
			display: { type: Number, required: true, default: 0, enum: Display },
			background: {
				type: { type: Number, required: true, default: 0, enum: BackgroundType },
				color: { type: String, required: true, default: '#f5f5fa', maxLength: 100 }
			},
			button: {
				style: { type: Number, required: true, default: 0, enum: ButtonStyle },
				color: { type: String, required: true, default: '#fafafa', maxLength: 100 },
				borderColor: { type: String, required: true, default: '#333333', maxLength: 100 },
				fontColor: { type: String, required: true, default: '#333333', maxLength: 100 }
			},
			font: { type: Number, required: true, default: 0, enum: Font },
			// fontColor is overriden by button.fontColor
			fontColor: { type: String, required: true, default: '#333333', maxLength: 100 }
		},
		links: [
			{
				title: { type: String, required: true, maxLength: 60, default: 'New Link' },
				url: { type: String, required: true, maxLength: 300 },
				image: { type: String, required: false, maxLength: 300 }
			}
		],
		specials: [
			{
				type: { type: Number, required: true, enum: SpecialLink },
				username: { type: String, required: true, maxLength: 100 }
			}
		]
	},
	{ timestamps: true }
);

export const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
