import { z } from 'zod';
import Theme from '$lib/theme';

// contains validation schemas
export const username = z
	.string({
		required_error: 'Username is required.',
		invalid_type_error: 'Username must be a string.'
	})
	.min(1, { message: 'Username must be at least 3 characters long.' })
	.max(15, { message: 'Username must be at most 15 characters long.' })
	.regex(/^[a-zA-Z0-9\s]*$/, {
		message: 'Username should only contain alphanumeric characters and spaces.'
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

export const theme = z
	.number({
		required_error: 'Theme is required.',
		invalid_type_error: 'Theme must be a number.'
	})
	.min(0, { message: 'Theme must be at least 0.' })
	.max((Object.keys(Theme).length/2) - 1, { message: `Theme must be at most ${(Object.keys(Theme).length/2) - 1	}.` })
	.transform((val) => {
		return Theme[val];
	});
