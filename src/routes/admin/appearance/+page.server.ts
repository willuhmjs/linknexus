import { fail } from '@sveltejs/kit';
import * as validator from '$lib/validation';
import type { IUser } from '$lib/types';
import type { ITheme } from '$lib/types';

export const actions = {
	theme: async ({ locals, request }) => {
		const user = locals.user;

		const data = await request.formData();

		const theme = {
			background: {
				type: parseInt(data.get('backgroundType')?.toString() || ''),
				color: data.get('backgroundColor')?.toString() || ''
			},
			button: {
				style: parseInt(data.get('buttonStyle')?.toString() || ''),
				color: data.get('buttonColor')?.toString() || '',
				fontColor: data.get('buttonFontColor')?.toString() || ''
			},
			font: parseInt(data.get('font')?.toString() || ''),
			fontColor: data.get('fontColor')?.toString() || ''
		} as ITheme;
		const validUser = user as IUser;
		validUser.theme = theme;
		try {
			validator.theme.parse(validUser.theme);
		} catch (e) {
			console.error(e);
			return fail(403, { ref: 'theme', error: true, message: e.errors[0].message });
		}
		await validUser.save();
	}
};
