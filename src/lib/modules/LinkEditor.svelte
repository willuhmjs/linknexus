<script lang="ts">
	import { SpecialLink } from '$lib/types.js';
	import Sortable from 'sortablejs';
	import { onMount } from 'svelte';

	let linksElement: HTMLUListElement;
	export let links:
		| { title: string; url: string; _id: string }[]
		| { type: SpecialLink; username: string; _id: string }[];
	let saveFailureMessage: string;

	onMount(() => {
		Sortable.create(linksElement, {
			animation: 200,
			onUpdate: () => {
				links = Array.from(linksElement.querySelectorAll('li'))
					.map((li) => {
						const linkId = li.querySelector('a')?.id || '';
						return links.find((link: { _id: string }) => link?._id === linkId);
					})
					.filter(Boolean) as { title: string; url: string; _id: string }[];
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
		fetch('/admin/links?/update', {
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

{#if saveFailureMessage}
	<p class="save-failure">{saveFailureMessage}</p>
{/if}
<ul bind:this={linksElement}>
	{#if links?.length > 0}
		{#each links as link (link._id)}
			<li>
				<a href={link.url ?? link.username} target="_blank" rel="noopener noreferrer" id={link._id}>
					<span>{link.title ?? SpecialLink[link.type]}</span>
				</a>
				<form on:submit|preventDefault={deleteLink}>
					<input type="hidden" name="id" value={link._id} />
					<button type="submit">Delete</button>
				</form>
			</li>
		{/each}
	{/if}
</ul>
