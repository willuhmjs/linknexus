<script lang="ts">
	export let data;
	export let form: ActionData;
	import { Font, ButtonStyle, BackgroundType } from '$lib/types.js';
	import type { ActionData } from './$types.js';
</script>

<form method="POST" action="?/theme">
	{#if form?.ref === 'theme'}
		<p class={form?.error ? 'error' : 'success'}>{form?.message}</p>
	{/if}
	<h2>Background</h2>
	<p>Background Color</p>
	<input type="color" name="backgroundColor" value={data.user.theme.background.color} required />

	<p>Background Type</p>
	<select name="backgroundType" required>
		{#each Object.keys(BackgroundType).filter((value) => !isNaN(parseFloat(value))) as type}
			<option selected={type == data.user.theme.background.type} value={type}
				>{BackgroundType[parseInt(type)]}</option
			>
		{/each}
	</select>
	<h2>Button</h2>

	<p>Button Style</p>
	<select name="buttonStyle" required>
		{#each Object.keys(ButtonStyle).filter((value) => !isNaN(parseFloat(value))) as style}
			<option selected={style == data.user.theme.button.style} value={style}
				>{ButtonStyle[parseInt(style)]}</option
			>
		{/each}
	</select>

	<p>Button Color</p>
	<input type="color" name="buttonColor" value={data.user.theme.button.color} required />

	<p>Button Font Color</p>
	<input type="color" name="buttonFontColor" value={data.user.theme.button.fontColor} required />
	<h2>General</h2>
	<p>Page Font</p>
	<select name="font" required>
		{#each Object.keys(Font).filter((value) => !isNaN(parseFloat(value))) as font}
			<option selected={font == data.user.theme.font} value={font}>{Font[parseInt(font)]}</option>
		{/each}
	</select>
	<p>Page Font Color</p>
	<input type="color" name="fontColor" value={data.user.theme.fontColor} required />
	<br />
	<button type="submit">Update Theme</button>
</form>
