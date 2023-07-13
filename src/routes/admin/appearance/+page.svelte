<script lang="ts">
	import { Font, ButtonStyle, BackgroundType } from '$lib/types.js';
	import type { IUser } from '$lib/types.js';
	export let data: { message: string; error: boolean; user: IUser };
	import wuser from '$lib/user';
	import api from '$lib/api';
</script>

<form on:submit|preventDefault={async (e) => (data = await api('/admin/appearance/theme', e))}>
	{#if data.message}
		<p class={data?.error ? 'error' : 'success'}>{data?.message}</p>
	{/if}
	<h2>Background</h2>
	<p>Background Color</p>
	<input type="color" name="backgroundColor" value={$wuser.theme.background.color} required />

	<p>Background Type</p>
	<select name="backgroundType" required>
		{#each Object.keys(BackgroundType).filter((value) => !isNaN(parseFloat(value))) as type}
			<option selected={type == $wuser.theme.background.type.toString()} value={type}
				>{BackgroundType[parseInt(type)]}</option
			>
		{/each}
	</select>
	<h2>Button</h2>

	<p>Button Style</p>
	<select name="buttonStyle" required>
		{#each Object.keys(ButtonStyle).filter((value) => !isNaN(parseFloat(value))) as style}
			<option selected={style == $wuser.theme.button.style.toString()} value={style}
				>{ButtonStyle[parseInt(style)]}</option
			>
		{/each}
	</select>

	<p>Button Color</p>
	<input type="color" name="buttonColor" value={$wuser.theme.button.color} required />

	<p>Button Font Color</p>
	<input type="color" name="buttonFontColor" value={$wuser.theme.button.fontColor} required />
	<h2>General</h2>
	<p>Page Font</p>
	<select name="font" required>
		{#each Object.keys(Font).filter((value) => !isNaN(parseFloat(value))) as font}
			<option selected={font == $wuser.theme.font.toString()} value={font}
				>{Font[parseInt(font)]}</option
			>
		{/each}
	</select>
	<p>Page Font Color</p>
	<input type="color" name="fontColor" value={$wuser.theme.fontColor} required />
	<br />
	<button type="submit">Update Theme</button>
</form>
