<script lang="ts">
	import type { IUser } from '$lib/types.js';
	export let data: { message: string; error: boolean; user: IUser };
	import Gravatar from 'svelte-gravatar';
	import api from '$lib/api';
	import wuser from '$lib/user';
</script>

<h1>Account Information</h1>
<div class="category">
<Gravatar email={$wuser.email} size={150} default="mp" rating="g" style="border-radius: 50%;" />
<h4>Username</h4>
<p>{$wuser.username}</p>
<h4>Email</h4>
<p>{$wuser.email}</p>
<form method="POST" action="/auth?/logout">
	<button type="submit" class="bt-bad">Logout</button>
</form>
<h4>Bio</h4>
<form on:submit|preventDefault={async (e) => (data = await api('/admin/user/bio', e.target))}>
	<p class={data?.error ? 'error' : 'success'}>{data?.message || ''}</p>
	<input type="text" name="bio" value={data?.user.bio || ''} autocomplete="off" />
	<button type="submit" class="bt-primary">Update Bio</button>
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
</style>
