<script lang="ts">
	export let data;
	export let form: ActionData;
	import type { ActionData } from './$types.js';
	import Sortable from 'sortablejs';
	import { onMount } from 'svelte';

	let linksElement: HTMLUListElement;
	let links: { title: string; url: string; icon: string; _id: string }[] = data.user?.links;
	let saveFailureMessage: string;

	onMount(() => {
		Sortable.create(linksElement, {
			group: {
				name: 'links',
				put: true
			},
			animation: 200,
			onUpdate: () => {
				links = Array.from(linksElement.querySelectorAll('li'))
					.map((li) => {
						const linkId = li.querySelector('a')?.id || '';
						return links.find((link) => link?._id === linkId);
					})
					.filter(Boolean) as { title: string; url: string; icon: string; _id: string }[];
				updateLinks();
			}
		});
	});

	function deleteLink(event: Event) {
		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);
		const id = formData.get('id') as string;
		const linkIndex = links.findIndex((link) => link._id === id);
		links.splice(linkIndex, 1);
		const li = linksElement.querySelector(`li:nth-child(${linkIndex + 1})`);
		li?.remove();
		updateLinks();
	}

	function updateLinks() {
		const urlEncodedData = new URLSearchParams();
		urlEncodedData.append('links', JSON.stringify(links));
		// Set the request headers
		const headers = new Headers();
		headers.append('Content-Type', 'application/x-www-form-urlencoded');
		headers.append('Cookie', document.cookie);

		// Make the POST request
		fetch('/admin/links?/links', {
			method: 'POST',
			headers: headers,
			body: urlEncodedData.toString()
		})
			.then((res) => res.json())
			.then((res) => {
				saveFailureMessage = JSON.parse(res.data)[3];
			});
	}
</script>

<div class="container">
	<h2>Links</h2>
	<form method="POST" action="?/link">
		{#if form?.ref === 'link'}
			<p class={form?.error ? 'error' : 'success'}>{form?.message}</p>
		{/if}
		<input
			type="text"
			name="icon"
			placeholder="Emoji"
			autocomplete="off"
			value={form?.icon || '🔗'}
			required
		/>
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

	{#if saveFailureMessage}
		<p class="save-failure">{saveFailureMessage}</p>
	{/if}
	<ul bind:this={linksElement}>
		{#if links?.length > 0}
			{#each links as link (link._id)}
				<li>
					<a href={link.url} target="_blank" rel="noopener noreferrer" id={link._id}>
						<span>{link.icon}</span>
						<span>{link.title}</span>
					</a>
					<form on:submit|preventDefault={deleteLink}>
						<input type="hidden" name="id" value={link._id} />
						<button type="submit">Delete</button>
					</form>
				</li>
			{/each}
		{/if}
	</ul>
</div>
