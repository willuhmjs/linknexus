<script lang="ts">
	import { Font, ButtonStyle, BackgroundType } from '$lib/types.js';
	import type { IUser } from '$lib/types.js';
	export let data: { message: string; error: boolean; user: IUser };
	import wuser from '$lib/user';
	import api from '$lib/api';
	import { onMount } from 'svelte';

	onMount(() => {
		let form: HTMLFormElement = document.getElementById('form') as HTMLFormElement;
		const inputs = form.querySelectorAll('input, select');
			inputs.forEach((input) => {
			input.addEventListener('change', async () => {
				data = await api('/admin/appearance/theme', form);
			});
		});
	})
</script>

<form id="form" on:submit|preventDefault>
	{#if data.error}
		<p class="error">{data?.message}</p>
	{/if}
	<h2>Background</h2>
	<div class="category">
		<h4>Type</h4>
		<select name="backgroundType" required>
			{#each Object.keys(BackgroundType).filter((value) => !isNaN(parseFloat(value))) as type}
				<option selected={type == $wuser.theme.background.type.toString()} value={type}
					>{BackgroundType[parseInt(type)]}</option
				>
			{/each}
		</select>

		<h4>Color</h4>
		<input type="color" name="backgroundColor" value={$wuser.theme.background.color} required />
	</div>
	
	<h2>Button</h2>
	<div class="category">
		<h4>Border</h4>
		<select name="buttonStyle" required>
			{#each Object.keys(ButtonStyle).filter((value) => !isNaN(parseFloat(value))) as style}
				<option selected={style == $wuser.theme.button.style.toString()} value={style}
					>{ButtonStyle[parseInt(style)]}</option
				>
			{/each}
		</select>
		<h4>Border Color</h4>
		<input type="color" name="buttonBorderColor" value={$wuser.theme.button.borderColor} required />

		<h4>Background Color</h4>
		<input type="color" name="buttonColor" value={$wuser.theme.button.color} required />

		<h4>Font Color</h4>
		<input type="color" name="buttonFontColor" value={$wuser.theme.button.fontColor} required />
	</div>

	<h2>General</h2>
	<div class="category">
	<h4>Page Font</h4>
	<select name="font" required>
		{#each Object.keys(Font).filter((value) => !isNaN(parseFloat(value))) as font}
			<option selected={font == $wuser.theme.font.toString()} value={font}
				>{Font[parseInt(font)]}</option
			>
		{/each}
	</select>
	<h4>Page Font Color</h4>
	<input type="color" name="fontColor" value={$wuser.theme.fontColor} required />
</div>
</form>

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