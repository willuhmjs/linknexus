<script lang="ts">
	import type { ActionData } from '../../routes/auth/$types';

	export let form: ActionData;
</script>

{#if form?.success === false}
	<p style="color: red;">{form.message}</p>
{/if}
<h2>Login</h2>
<form method="POST" action="?/login">
	<input
		type="text"
		name="username"
		placeholder="Username"
		value={form?.username || ''}
		autocomplete="off"
	/>
	<input type="password" name="password" placeholder="Password" />
	<button type="submit">Login</button>
</form>
<h2>Register</h2>
<form method="POST" action="?/register">
	<input
		type="text"
		name="username"
		placeholder="Username"
		value={form?.username || ''}
		autocomplete="off"
		required
	/>
	<input
		type="email"
		name="email"
		placeholder="Email"
		value={form?.email || ''}
		autocomplete="off"
		required
	/>
	<input type="password" name="password" placeholder="Password" required />
	<button type="submit">Register</button>
</form>
