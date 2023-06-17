import { z } from 'zod';
import { BackgroundType, ButtonStyle, Font, SpecialLink } from '$lib/types';

// contains validation schemas
export const username = z
	.string({
		required_error: 'Username is required.',
		invalid_type_error: 'Username must be a string.'
	})
	.min(1, { message: 'Username must be at least 3 characters long.' })
	.max(15, { message: 'Username must be at most 15 characters long.' })
	.regex(/^[a-zA-Z0-9]*$/, {
		message: 'Username should only contain alphanumeric characters.'
	})
	.refine((value) => value !== 'admin', {
		message: 'Username cannot be "admin".'
	});

export const password = z
	.string({
		required_error: 'Password is required.',
		invalid_type_error: 'Password must be a string.'
	})
	.min(8, { message: 'Password must be at least 8 characters long.' })
	.max(30, { message: 'Password must be at most 30 characters long.' })
	.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>])/, {
		message:
			'Password should contain at least one lowercase letter, one uppercase letter, one digit, and one special character.'
	});

export const email = z
	.string({
		required_error: 'Email is required.',
		invalid_type_error: 'Email must be a string.'
	})
	.email({ message: 'Email must be a valid email address.' });

export const bio = z
	.string({
		required_error: 'Bio is required.',
		invalid_type_error: 'Bio must be a string.'
	})
	.min(1, { message: 'Bio must be at least 1 character long.' })
	.max(160, { message: 'Bio must be at most 160 characters long.' });

const colorSchema = z
	.string({
		required_error: 'Color is required.',
		invalid_type_error: 'Color must be a string.'
	})
	.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Invalid hexadecimal color code');

export const theme = z.object({
	background: z.object({
		type: z.nativeEnum(BackgroundType, {
			required_error: 'Background type is required.',
			invalid_type_error: 'Background type must be a number.'
		}),
		// todo implement color check
		color: colorSchema
	}),
	button: z.object({
		radius: z
			.number({
				required_error: 'Button radius is required.',
				invalid_type_error: 'Button radius must be a number.'
			})
			.min(0, { message: 'Button radius must be at least 0.' })
			.max(100, { message: 'Button radius must be at most 100.' }),
		style: z.nativeEnum(ButtonStyle, {
			required_error: 'Button style is required.',
			invalid_type_error: 'Button style must be a number.'
		}),
		// todo implement color check
		color: colorSchema,
		// todo implement color check
		fontColor: colorSchema
	}),
	font: z.nativeEnum(Font, {
		required_error: 'Font is required.',
		invalid_type_error: 'Font must be a number.'
	}),
	// todo implement color check
	fontColor: colorSchema
});

export const link = z
	.string({
		required_error: 'URL is required.',
		invalid_type_error: 'URL must be a string.'
	})
	.url({
		message: 'Must be a valid URL.'
	});

export const title = z
	.string()
	.min(1, { message: 'Title must be at least 1 character long.' })
	.max(60, { message: 'Title must be at most 60 characters long.' })
	.refine((value) => /\S/.test(value), {
		message: 'Title cannot be empty.',
		path: []
	});

const usernameValidators: Record<SpecialLink, RegExp> = {
	[SpecialLink.INSTAGRAM]: /^[a-zA-Z0-9._]+$/,
	[SpecialLink.TWITTER]: /^[a-zA-Z0-9_]+$/,
	[SpecialLink.DISCORD]: /^[a-zA-Z0-9._]{3,32}$/,
	[SpecialLink.YOUTUBE]: /^[a-zA-Z0-9_-]+$/,
	[SpecialLink.TWITCH]: /^[a-zA-Z0-9_]{4,25}$/,
	[SpecialLink.TIKTOK]: /^[a-zA-Z0-9._]+$/,
	[SpecialLink.PATREON]: /^[a-zA-Z0-9_-]+$/,
	[SpecialLink.SNAPCHAT]: /^[a-zA-Z0-9._-]+$/,
	[SpecialLink.LINKEDIN]: /^[a-zA-Z0-9-]+$/,
	[SpecialLink.FACEBOOK]: /^[a-zA-Z0-9.]+$/,
	[SpecialLink.SPOTIFY]: /^[a-zA-Z0-9]+$/
};

export const special = z
	.object({
		type: z.nativeEnum(SpecialLink),
		username: z.string()
	})
	.refine(
		(ctx) => {
			const { type, username } = ctx;
			const validator = usernameValidators[type as SpecialLink];
			return validator ? validator.test(username) : true;
		},
		{
			message: 'Invalid username.'
		}
	);
