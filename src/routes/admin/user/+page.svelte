<script lang="ts">
	import type { IUser } from '$lib/types.js';
	export let data: { message: string; error: boolean; user: IUser };
	import Gravatar from 'svelte-gravatar';
	import api from '$lib/api';
	import wuser from '$lib/user';
</script>

<h1>Account Information</h1>
<Gravatar email={$wuser.email} size={150} default="mp" rating="g" style="border-radius: 50%;" />
<p><strong>Username:</strong> {$wuser.username}</p>
<p><strong>Email:</strong> {$wuser.email}</p>
<p><strong>Credentials:</strong> Placeholder for credentials</p>
<form method="POST" action="/auth?/logout">
	<button type="submit" class="logout-button">Logout</button>
</form>
<form on:submit|preventDefault={async (e) => (data = await api('/admin/user/bio', e))}>
	<p class={data?.error ? 'error' : 'success'}>{data?.message || ''}</p>
	<input required type="text" name="bio" placeholder={data?.user.bio || ''} autocomplete="off" />
	<button type="submit">Update Bio</button>
</form>
