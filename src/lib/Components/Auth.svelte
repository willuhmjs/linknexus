<script lang="ts">
	import type { ActionData } from '../../routes/auth/$types';
	import { LoginTypes } from "$lib/types";
	export let form: ActionData;
	
	let currentType: LoginTypes = form?.type || LoginTypes.LOGIN;
</script>

<style>
	/* Center the form both horizontally and vertically */
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
	}

	.formContainer {
		max-width: 20em;
		padding: 0.75rem;
		background-color: #fafafa;
		border: 2px solid #e8e8ed;
		border-radius: 0.5rem;
		font-size: 1rem;
	}

	/* change form width on smaller devices */
	@media (max-width: 600px) {
		form {
			width: 100%;
		}
	}

	/* full-width inputs */
	input[type='text'],
	input[type='password'],
	input[type='email'] {
		width: 100%;
		padding: 0.5em;
		margin: 0.5em 0;
		border: 1px solid #ccc;
		border-radius: 0.5em;
	}

	input[type='text']:focus,
	input[type='password']:focus,
	input[type='email']:focus {
		outline: none;
		border-color: #aaa;
	}

	button[type='submit'] {
		width: 100%;
		margin-top: .5rem;
	}

	.togglebuttons {
		display: flex;
		gap: 5px;
	}

	.togglebuttons button {
		flex: 1;
	}

	h3 {
		margin-bottom: .5rem;
	}
</style>



<div class="container">
	<div class="formContainer">
	<div class="togglebuttons">
		<button type="button" on:click|preventDefault={() => currentType = LoginTypes.LOGIN}>Login</button>
		<button type="button" on:click|preventDefault={() => currentType = LoginTypes.REGISTER}>Register</button>
	</div>
	<form method="POST" action={currentType === LoginTypes.LOGIN ? "?/login" : "?/register"}>
		
		<h3>{currentType.toString()}</h3>
		{#if form?.success === false}
			<p style="color: red;">{form.message}</p>
		{/if}
		{#if currentType === LoginTypes.LOGIN}
		<input
			type="text"
			name="username"
			placeholder="Username"
			value={form?.username || ''}
			autocomplete="off"
		/>
		<input type="password" name="password" placeholder="Password" />
		{:else}
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
		{/if}
		<button class="bt-primary" type="submit">{currentType.toString()}</button>

	</form>
</div>
</div>
