import wuser from '$lib/user';

export default async function api(path: string, form: HTMLFormElement) {
	const formData = new FormData(form);
	const data = Object.fromEntries(formData.entries());
	const rawRes = await fetch(path, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});
	const jsonData = await rawRes.json();
	wuser.set(jsonData.user);
	return jsonData;
}
