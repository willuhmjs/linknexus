import { fail } from '@sveltejs/kit';
import { checkAuth } from '$lib/auth';
import * as validator from '$lib/validation';
import type { IUser } from '$lib/mongo';
import type { ITheme } from '$lib/types';

export const actions = {
	theme: async ({ cookies, request }) => {
		const user = await checkAuth(cookies);
		if (!user) {
			return fail(403, { ref: 'theme', error: true, message: 'Not authorized!' });
		}

		const data = await request.formData();
		
		const theme = {
			background: {
				type: parseInt(data.get('backgroundType')?.toString() || ''),
				color: data.get('backgroundColor')?.toString() || ''
			},
			button: {
				radius: parseInt(data.get('buttonRadius')?.toString() || ''),
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
