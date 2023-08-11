<script lang="ts">
	import { Font, ButtonStyle, BackgroundType, Display } from '$lib/types.js';
	import ColorPicker from 'svelte-awesome-color-picker';
	import Input from '$lib/modules/ColorPicker/Input.svelte';
	import Wrapper from '$lib/modules/ColorPicker/Wrapper.svelte';
	import type { IUser } from '$lib/types.js';
	export let data: { message: string; error: boolean; user: IUser };
	import wuser from '$lib/user';
	import api from '$lib/api';
	import lighten from '$lib/lighten';
	import { onMount } from 'svelte';
	let submit: HTMLInputElement;

	let initialTheme = structuredClone($wuser.theme);
	onMount(() => {
		let form: HTMLFormElement = document.getElementById('form') as HTMLFormElement;
		const inputs = form.querySelectorAll('input, select');
		inputs.forEach((input) => {
			input.addEventListener('change', async () => {
				data = await api('/admin/appearance', form);
			});
		});
	});
</script>

<form id="form" on:submit|preventDefault>
	<!-- for submitting the form programmatically via event dispatch -->
	<input type="hidden" bind:this={submit} />
	{#if data.error}
		<p class="error">{data?.message}</p>
	{/if}
	<h2>Background</h2>
	<div class="category">
		<h4>Type</h4>
		{#each Object.keys(BackgroundType).filter((value) => !isNaN(parseFloat(value))) as type}
			<div class="radioDiv">
				<label for="backgroundType-{type}">
					<input
						type="radio"
						id="backgroundType-{type}"
						name="backgroundType"
						checked={type == $wuser.theme.background.type.toString()}
						value={type}
					/>
					<div class="outerphone">
						<div
							class="radioBox"
							style="{type == '1'
								? `background: linear-gradient(0deg, ${lighten(
										$wuser.theme.background.color,
										65
								  )} 0%, ${$wuser.theme.background.color} 100%);`
								: `background: ${$wuser.theme.background.color};`}; width: 90px; height: 160px"
						/>
					</div>
				</label>
			</div>
		{/each}
		<h4>Color</h4>
		<ColorPicker
			bind:hex={initialTheme.background.color}
			on:input={() => submit.dispatchEvent(new CustomEvent('change'))}
			canChangeMode={false}
			components={{ input: Input, wrapper: Wrapper }}
		/>
		<input type="hidden" name="backgroundColor" value={initialTheme.background.color} />
	</div>

	<h2>Button</h2>
	<div class="category">
		<h4>Border</h4>
		{#each Object.keys(ButtonStyle).filter((value) => !isNaN(parseFloat(value))) as style}
			<div class="radioDiv">
				<label for="buttonStyle-{style}">
					<input
						type="radio"
						id="buttonStyle-{style}"
						name="buttonStyle"
						checked={style == $wuser.theme.button.style.toString()}
						value={style}
					/>
					<div class="outerphone">
						<div
							class="radioBox"
							style="background: {$wuser.theme.button.color}; border: 2px {ButtonStyle[
								parseInt(style)
							]} {$wuser.theme.button.borderColor}; width: 200px; height: 50px;"
						>
							<span style="color: {$wuser.theme.button.fontColor}">{ButtonStyle[style]}</span>
						</div>
					</div>
				</label>
			</div>
		{/each}
		<h4>Border Color</h4>
		<ColorPicker
			bind:hex={initialTheme.button.borderColor}
			on:input={() => submit.dispatchEvent(new CustomEvent('change'))}
			canChangeMode={false}
			components={{ input: Input, wrapper: Wrapper }}
		/>
		<input type="hidden" name="buttonBorderColor" value={initialTheme.button.borderColor} />
		<h4>Background Color</h4>
		<ColorPicker
			bind:hex={initialTheme.button.color}
			on:input={() => submit.dispatchEvent(new CustomEvent('change'))}
			canChangeMode={false}
			components={{ input: Input, wrapper: Wrapper }}
		/>
		<input type="hidden" name="buttonColor" value={initialTheme.button.color} />
		<h4>Font Color</h4>
		<ColorPicker
			bind:hex={initialTheme.button.fontColor}
			on:input={() => submit.dispatchEvent(new CustomEvent('change'))}
			canChangeMode={false}
			components={{ input: Input, wrapper: Wrapper }}
		/>
		<input type="hidden" name="buttonFontColor" value={initialTheme.button.fontColor} />
	</div>

	<h2>General</h2>
	<div class="category">
		<h4>Display Mode</h4>
		<select name="display" required>
			{#each Object.keys(Display).filter((value) => !isNaN(parseFloat(value))) as display}
				<option selected={display == $wuser.theme.display.toString()} value={display}
					>{Display[parseInt(display)]}</option
				>
			{/each}
		</select>
		<h4>Page Font</h4>
		<select name="font" required>
			{#each Object.keys(Font).filter((value) => !isNaN(parseFloat(value))) as font}
				<option selected={font == $wuser.theme.font.toString()} value={font}
					>{Font[parseInt(font)]}</option
				>
			{/each}
		</select>
		<h4>Page Font Color</h4>
		<ColorPicker
			bind:hex={initialTheme.fontColor}
			on:input={() => submit.dispatchEvent(new CustomEvent('change'))}
			canChangeMode={false}
			components={{ input: Input, wrapper: Wrapper }}
		/>
		<input type="hidden" name="fontColor" value={initialTheme.fontColor} />
	</div>
</form>

<style>
	.category {
		padding: 0.5rem;
		background-color: #fafafa;
		border: 2px solid #e8e8ed;
		border-radius: 0.5rem;
	}

	.radioDiv {
		display: inline-block;
		margin-right: 1rem;
	}

	.radioDiv input[type='radio'] {
		display: none;
	}

	/* make the label of the active radio have a gray border */
	.radioDiv input[type='radio']:checked + .outerphone {
		padding: 3px;
		border: 2px solid #e2e2e2;
		border-radius: 0.5rem;
	}

	.category h4:first-child {
		margin-top: 5px;
	}

	.category h4 {
		margin-bottom: 0.7rem;
	}

	.radioBox {
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 0.5rem;
		border: 2px solid #e5e5e5;
	}

	select {
		width: 100%;
		height: 2.5rem;
		border-radius: 0.5rem;
		border: 2px solid #e5e5e5;
		padding: 0.5rem;
	}
</style>
