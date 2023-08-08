import { json } from '@sveltejs/kit';
import * as validator from '$lib/validation';
import type { ITheme, IUser } from '$lib/types';

export async function POST({ request, locals }) {
	const user = locals.user;

	const data = await request.json();

	const theme = {
		display: parseInt(data.display || ''),
		background: {
			type: parseInt(data.backgroundType || ''),
			color: data.backgroundColor || ''
		},
		button: {
			style: parseInt(data.buttonStyle || ''),
			color: data.buttonColor || '',
			fontColor: data.buttonFontColor || '',
			borderColor: data.buttonBorderColor || ''
		},
		font: parseInt(data.font || ''),
		fontColor: data.fontColor || ''
	} as ITheme;
	const validUser = user as IUser;
	try {
		validator.theme.parse(theme);
		validUser.theme = theme;
		await validUser.save();
		return json({ error: false, message: 'Theme updated!', user: validUser }, { status: 201 });
	} catch (e) {
		console.error(e);
		return json({ error: true, message: e.errors[0].message, user: validUser }, { status: 200 });
	}
}
