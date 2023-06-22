<script lang="ts">
	import { SpecialLink } from '$lib/types.js';
	export let data;
	export let form: ActionData;
	import type { ActionData } from './$types.js';
	import LinkEditor from '$lib/modules/LinkEditor.svelte';
	let links: { title: string; url: string; _id: string }[] = data.user?.links;
	let specials: { type: SpecialLink; username: string; _id: string }[] = data.user?.specials;
	
	const labelProportions = {
		title: 2,
		url: 2,
		type: 1,
		username: 2,
	};
</script>

<div class="addLink">
	{#if form?.ref === 'link' || form?.ref === 'special'}
			<p class={form?.error ? 'error' : 'success'}>{form?.message}</p>
		{/if}
	<form method="POST" action="?/link">
		
		<label for="title" style="flex: ${labelProportions.title}">
			<span>Title</span>
			<input
				id="title"
				type="text"
				name="title"
				placeholder="My Awesome Website"
				autocomplete="off"
				value={form?.title || ''}
				required
			/>
		</label>
		<label for="url" style="flex: ${labelProportions.url}">
			<span>URL</span>
			<input
				required
				id="url"
				type="url"
				name="url"
				placeholder="https://willuhmjs.com"
				autocomplete="off"
				value={form?.url || ''}
			/>
		</label>
		<button type="submit"><i class="fa-solid fa-arrow-up-right-from-square"></i>Add Hyperlink</button>
	</form>
	<hr />
	<div class="or-divider">OR</div>
	<hr />
	<form method="POST" action="?/special">
		<label for="type" style="flex: ${labelProportions.type}">
			<span>Type</span>
			<select name="type" required>
				{#each Object.keys(SpecialLink).filter((value) => !isNaN(parseFloat(value))) as type}
					<option value={type}>
						{SpecialLink[parseInt(type)]}
					</option>
				{/each}
			</select>
		</label>
		<label for="username" style="flex: ${labelProportions.username}">
			<span>Username</span>
			<input required type="text" name="username" placeholder="willuhmjs" autocomplete="off" />
		</label>
		<button type="submit"><i class="fa-solid fa-user-plus"></i>Add Social Link</button>
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

	.addLink > p {
		margin-top: 0;
	}

	select,
	input[type='text'],
	input[type='url'] {
		min-width: 0;
	}

	hr:first-of-type {
		margin-top: 1.2rem;
	}

	hr:last-of-type {
		margin-bottom: 1.2rem;
	}

	.or-divider {
		margin: 0.25rem 0;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #999;
		font-weight: bold;
	}

	form {
		margin: 0.5rem 0;
		display: flex;
		gap: 0.25rem;
	}

	label {
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	label > span {
		margin-bottom: 0.5rem;
		font-size: 0.85rem;
	}

	button > i {
		margin-right: 10px;
	}

	form input,
	form select {
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
		margin-top: auto;
	}

</style>
