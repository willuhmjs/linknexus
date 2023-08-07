<script lang="ts">
	import type { IUser } from '$lib/types.js';
	export let data: { message: string; error: boolean; user: IUser };
	import Gravatar from 'svelte-gravatar';
	import api from '$lib/api';
	import wuser from '$lib/user';
</script>

<h1>Account Information</h1>
<div class="category">
<Gravatar email={$wuser.email} size={150} default="mp" rating="g" style="border-radius: 50%; margin: 0.5rem;" />
<p class='error'>{data?.message || ''}</p>
<h4>Username</h4>
<form on:submit|preventDefault={async (e) => (data = await api('/admin/user/', e.target))}>
	<input type="text" name="username" value={data?.user.username || ''} autocomplete="off" />
	<h4>Bio</h4>
	<input type="text" name="bio" value={data?.user.bio || ''} autocomplete="off" />
<h4>Email</h4>
<p>{$wuser.email}</p>
<button type="submit" class="bt-primary">Update Profile</button>
</form>
<form method="POST" action="/auth?/logout">
	<button type="submit" class="bt-bad">Logout</button>
</form>
</div>
<style>
	.category {
		padding: 0.5rem;
		background-color: #fafafa;
		border: 2px solid #e8e8ed;
		border-radius: 0.5rem;
	}

	.category h4:first-child {
		margin-top: 5px;
	}

	.category h4 {
		margin-bottom: 0.7rem;
	}

	form {
		margin: 0.5rem;
	}

	input, form button {
		width: 100%;
	}
</style>
