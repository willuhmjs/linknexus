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
		<input type="color" name="backgroundColor" value={data.user.theme.background.color} required />
		<select name="backgroundType" required>
			{#each Object.keys(BackgroundType).filter((value) => !isNaN(parseFloat(value))) as type}
				<option selected={type == data.user.theme.background.type} value={type}
					>{BackgroundType[parseInt(type)]}</option
				>
			{/each}
		</select>
		<h2>Button</h2>
		<input
			type="range"
			name="buttonRadius"
			min="1"
			max="100"
			value={data.user.theme.button.radius}
			required
		/>
		<select name="buttonStyle" required>
			{#each Object.keys(ButtonStyle).filter((value) => !isNaN(parseFloat(value))) as style}
				<option selected={style == data.user.theme.button.style} value={style}
					>{ButtonStyle[parseInt(style)]}</option
				>
			{/each}
		</select>
		<input type="color" name="buttonColor" value={data.user.theme.button.color} required />
		<input type="color" name="buttonFontColor" value={data.user.theme.button.fontColor} required />
		<h2>General</h2>
		<select name="font" required>
			{#each Object.keys(Font).filter((value) => !isNaN(parseFloat(value))) as font}
				<option selected={font == data.user.theme.font} value={font}>{Font[parseInt(font)]}</option>
			{/each}
		</select>
		<input type="color" name="fontColor" value={data.user.theme.fontColor} required />
		<button type="submit">Update Theme</button>
	</form>
