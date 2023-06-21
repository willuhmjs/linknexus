<script lang="ts">
	import { SpecialLink } from '$lib/types.js';
	export let data;
	export let form: ActionData;
	import type { ActionData } from './$types.js';
	import LinkEditor from '$lib/modules/LinkEditor.svelte';
	let links: { title: string; url: string; _id: string }[] = data.user?.links;
	let specials: { type: SpecialLink; username: string; _id: string }[] = data.user?.specials;
</script>
	<div class="addLink">
		<form method="POST" action="?/link">
			{#if form?.ref === 'link'}
				<p class={form?.error ? 'error' : 'success'}>{form?.message}</p>
			{/if}
				<input
					id="title"
					type="text"
					name="title"
					placeholder="Title"
					autocomplete="off"
					value={form?.title || ''}
					required
				/>
			<input
				required
				id="url"
				type="url"
				name="url"
				placeholder="URL"
				autocomplete="off"
				value={form?.url || ''}
			/>
			<button type="submit">Add Link</button>
		</form>
		<hr>
		<div class="or-divider">OR</div>
		<hr>
		<form method="POST" action="?/special">
			{#if form?.ref === 'special'}
				<p class={form?.error ? 'error' : 'success'}>{form?.message}</p>
			{/if}
			<select name="type" required>
				{#each Object.keys(SpecialLink).filter((value) => !isNaN(parseFloat(value))) as type}
					<option value={type}>
						{SpecialLink[parseInt(type)]}
					</option>
				{/each}
			</select>
			<input required type="text" name="username" placeholder="username" autocomplete="off" />
			<button type="submit">Add Link</button>
		</form>
	</div>
	<LinkEditor {links} />
	<LinkEditor links={specials} />

<style>
	.addLink {
		padding: 1rem;
		background-color: #fafafa;
		border: 2px solid #e8e8ed;
		border-radius: 1rem;
	}


	select,
		input[type='text'],
		input[type='url'] {
			flex: 1;
			min-width: 0;
		}

		.or-divider {
			display: flex;
			justify-content: center;
			align-items: center;
			margin: 0.25rem;
			color: #999;
			font-weight: bold;
		}


		form {
			margin: 0.5rem 0;
			display: flex;
			gap: 0.25rem;
		}

		form input, form select {
			margin-bottom: 0.5rem;
			padding: 0.5rem;
			border-radius: 4px;
			border: 1px solid #ccc;
		}

		form button {
			background-color: #4dbbff;
			color: white;
			padding: 0.5rem 1rem;
			border: none;
			border-radius: 4px;
			cursor: pointer;
			margin-bottom: 0.5rem;
		}
</style>