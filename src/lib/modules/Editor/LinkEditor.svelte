<script lang="ts">
	import Sortable from 'sortablejs';
	import { onMount } from 'svelte';
	let linksElement: HTMLUListElement;
	export let links: { title: string; url: string; _id: string }[];
	let saveFailureMessage: string;
import wuser from "$lib/user";


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
		urlEncodedData.append('request', JSON.stringify({ ref: 'links', data: links }));
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
		$wuser.links = links
	}
</script>

{#if saveFailureMessage}
	<p class="save-failure">{saveFailureMessage}</p>
{/if}
<ul bind:this={linksElement}>
	{#if links?.length > 0}
		{#each links as link (link._id)}
			<li class="linkItem">
				<a href={link.url} target="_blank" rel="noopener noreferrer" id={link._id}>
					<span>{link.title}</span>
				</a>
				<form on:submit|preventDefault={deleteLink}>
					<input type="hidden" name="id" value={link._id} />
					<button type="submit" class="deleteButton"><i class="fa-solid fa-trash" />Delete</button>
				</form>
			</li>
		{/each}
	{:else}
		<p>No hyperlinks yet.</p>
	{/if}
</ul>

<style>
	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	li.linkItem {
		display: flex;
		align-items: center;
		padding: 0.5rem;
		background-color: #fafafa;
		border: 2px solid #e8e8ed;
		border-radius: 0.5rem;
		margin: 0.5rem 0;
	}

	li.linkItem a {
		text-decoration: none;
		color: #333;
		margin-right: 1rem;
		display: flex;
		align-items: center;
	}

	li a span:first-child {
		font-size: 1.3rem;
		margin-right: 0.5rem;
		word-break: break-all;
	}

	li form {
		margin-left: auto;
	}

	.deleteButton {
		color: white;
		white-space: nowrap;
		background-color: #ff4d4d;
	}

	i {
		margin-right: 10px;
	}
</style>
