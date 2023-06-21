<script lang="ts">
	export let data;
	export let form: ActionData;
	import type { ActionData } from './$types.js';
</script>
	<h1>Account Information</h1>
	<p><strong>Username:</strong> {data.user.username}</p>
	<p><strong>Email:</strong> {data.user.email}</p>
	<p><strong>Credentials:</strong> Placeholder for credentials</p>
	<form method="POST" action="/auth?/logout">
		<button type="submit" class="logout-button">Logout</button>
	</form>
	<form method="POST" action="?/bio">
		{#if form?.ref === 'bio'}
			<p class={form?.error ? 'error' : 'success'}>{form?.message}</p>
		{/if}
		<input required type="text" name="bio" placeholder={data?.user.bio || ''} autocomplete="off" />
		<button type="submit">Update Bio</button>
	</form>
