<script lang="ts">
	export let data;
	export let form: ActionData;
	import Theme from '$lib/theme';
	import type { ActionData } from './$types.js';
</script>

{#if data?.user}
	<h1>{data.user.username}</h1>
	<h2>{data.user.email}</h2>
	<p>{data.user.bio || 'No bio!'}</p>
	<p>{Theme[data.user.theme]}</p>
    <form method="POST" action="?/theme">
        {#if form?.ref === 'theme'}
            <p style={form?.error ? 'color: red;' : 'color: green;'}>{form?.message}</p>
        {/if}
        <select name="theme">
          {#each Object.keys(Theme).filter(value => !isNaN(parseFloat(value))) as theme}
            <option selected={(theme == data.user.theme)} value={theme}>{Theme[theme]}</option>
          {/each}
        </select>
        <button type="submit">Update Theme</button>
      </form>
    <form method="POST" action="?/logout">
        <button type="submit">Logout</button>
    </form>
	<form method="POST" action="?/bio">
		{#if form?.ref === 'bio'}
			<p style={form?.error ? 'color: red;' : 'color: green;'}>{form?.message}</p>
		{/if}
		<input type="text" name="bio" placeholder={data?.user.bio || ''} autocomplete="off" />
        <button type="submit">Update Bio</button>
    </form>
{:else}
	{#if form?.success === false}
		<p style="color: red;">{form.message}</p>
	{/if}
	<h2>Login</h2>
	<form method="POST" action="?/login">
		<input type="text" name="username" placeholder="Username" value={form?.username || ''} autocomplete="off" />
		<input type="password" name="password" placeholder="Password" />
		<button type="submit">Login</button>
	</form>
	<h2>Register</h2>
	<form method="POST" action="?/register">
		<input type="text" name="username" placeholder="Username" value={form?.username || ''} autocomplete="off" />
		<input type="email" name="email" placeholder="Email" value={form?.email || ''} autocomplete="off" />
		<input type="password" name="password" placeholder="Password" />
		<button type="submit">Login</button>
	</form>
{/if}
