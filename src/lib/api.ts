import wuser from "$lib/user";

export default async function api(path: string, event: SubmitEvent) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData.entries());
    const rawRes = await fetch(path, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const jsonData = await rawRes.json();
    wuser.set(jsonData.user);
    return jsonData;
}