<script lang="ts">
	import Sortable from 'sortablejs';
	import { onMount } from 'svelte';
	let linksElement: HTMLUListElement;
	export let links: { title: string; url: string; _id: string, image?: string }[];
	import wuser from '$lib/user';

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

	let editor: HTMLDivElement;

	function toggleEditor(event: Event) {
		// access the div with the class "editor" relative to the form and toggle its display betwene block and none
		const form = event.target as HTMLFormElement;
		const editor = form.parentElement?.parentElement?.parentElement?.querySelector('.editor') as HTMLDivElement;
		editor.style.display = editor.style.display === 'block' ? 'none' : 'block';
	}

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
		fetch('/admin/links/update', {
			method: 'POST',
			body: JSON.stringify({ ref: 'links', links })
		})
		$wuser.links = links;
	}

	function updateSingle(event: Event) {
		// update the array and then call updateLinks
		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);
		const id = formData.get('id') as string;
		const linkIndex = links.findIndex((link) => link._id === id);
		const link = links[linkIndex];
		link.title = formData.get('title') as string;
		link.url = formData.get('url') as string;
		link.image = formData.get('image') as string;
		updateLinks();
	}
</script>

<ul bind:this={linksElement}>
	{#if links?.length > 0}
		{#each links as link (link._id)}
			<li class="linkItem">
				<div class="preview">
					{#if link.image}
					<img class="previewImg" src={link.image} alt={link.title} />
				{/if}
				<a href={link.url} target="_blank" rel="noopener noreferrer" id={link._id}>
					<span>{link.title}</span>
				</a>
				<div class="btnDiv">
					<form on:submit|preventDefault={toggleEditor} class="editBtn">
						<input type="hidden" name="id" value={link._id} />
						<button type="submit" class="bt-primary"><i class="fa-solid fa-pencil" /></button>
					</form>
					<form on:submit|preventDefault={deleteLink} class="deleteBtn">
						<input type="hidden" name="id" value={link._id} />
						<button type="submit" class="bt-bad"><i class="fa-solid fa-trash" /></button>
					</form>
			</div>
			</div>
			<div class="editor">
				<form on:submit|preventDefault={updateSingle}>
					<input type="hidden" name="id" value={link._id} />
					<label for="title">Title</label>
					<input type="text" name="title" value={link.title} />
					<label for="url">URL</label>
					<input type="text" name="url" value={link.url} />
					<label for="image">Image URL</label>
					<input type="text" name="image" value={link.image} />
					<button type="submit" class="bt-primary">Update</button>
				</form>
			</div>
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
		background-color: #fafafa;
		border: 2px solid #e8e8ed;
		border-radius: 0.5rem;
		min-height: 3.5rem;
		margin: 0.25rem 0;
		padding: 0.5rem;
	}

	li.linkItem div.preview {
		display: flex;
		align-items: center;
		margin: auto;
	}

	li.linkItem .btnDiv {
		margin-left: auto;
		display: flex;
		gap: 7px;
	}

	li.linkItem a {
		text-decoration: none;
		color: #333;
		margin-right: 1rem;
		display: flex;
		align-items: center;
	}

	li a span:first-child {
		font-size: 1.2rem;
		margin-right: 0.5rem;
		word-break: break-all;
	}

	li form {
		margin-left: auto;
	}

	.previewImg {
		border-radius: 4px;
		margin-right: 10px;
		width: 43px;
		height: 43px;
	}

	.editor {
		display: block;
		margin-top: 15px;
	}

	@media screen and (min-width: 0px) and (max-width: 1050px) {
		.deleteBtn {
			display: none;
		}
	}
</style>
