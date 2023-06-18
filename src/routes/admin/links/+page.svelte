<script lang="ts">
	import { SpecialLink } from '$lib/types.js';
	export let data;
	export let form: ActionData;
	import type { ActionData } from './$types.js';
	import LinkEditor from '$lib/modules/LinkEditor.svelte';
	let links: { title: string; url: string; _id: string }[] = data.user?.links;
	let specials: { type: SpecialLink, username: string, _id: string}[] = data.user?.specials;
</script>

<div class="container">
	<h2>Links</h2>
	<form method="POST" action="?/link">
		{#if form?.ref === 'link'}
			<p class={form?.error ? 'error' : 'success'}>{form?.message}</p>
		{/if}
		<input
			type="text"
			name="title"
			placeholder="Title"
			autocomplete="off"
			value={form?.title || ''}
			required
		/>
		<input
			required
			type="url"
			name="url"
			placeholder="URL"
			autocomplete="off"
			value={form?.url || ''}
		/>
		<button type="submit">Add Link</button>
	</form>
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
		<button type="submit">Add Special Link</button>		
	</form>
	<LinkEditor {links} />
	<LinkEditor links={specials} />
</div>
