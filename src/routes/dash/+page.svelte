<script lang="ts">
	export let data;
	export let form: ActionData;
	import Theme from '$lib/theme';
	import type { ActionData } from './$types.js';
	import Sortable from 'sortablejs';
	import { onMount } from 'svelte';
	import Auth from '$lib/modules/Auth.svelte';

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
		fetch('/dash?/links', {
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
	<div class="account-info">
		<h1>Account Information</h1>
		<p><strong>Username:</strong> {data.user.username}</p>
		<p><strong>Email:</strong> {data.user.email}</p>
		<p><strong>Credentials:</strong> Placeholder for credentials</p>
		<form method="POST" action="?/logout">
			<button type="submit" class="logout-button">Logout</button>
		</form>
	</div>
	<div class="profile-info">
		<h1>Profile Information</h1>
		<p><strong>Bio:</strong> {data.user.bio || 'No bio!'}</p>
		<p><strong>Theme:</strong> {Theme[data.user.theme]}</p>
		<form method="POST" action="?/theme">
			{#if form?.ref === 'theme'}
				<p class={form?.error ? 'error' : 'success'}>{form?.message}</p>
			{/if}
			<select name="theme">
				{#each Object.keys(Theme).filter((value) => !isNaN(parseFloat(value))) as theme}
					<option selected={theme == data.user.theme} value={theme}>{Theme[theme]}</option>
				{/each}
			</select>
			<button type="submit">Update Theme</button>
		</form>
		<form method="POST" action="?/bio">
			{#if form?.ref === 'bio'}
				<p class={form?.error ? 'error' : 'success'}>{form?.message}</p>
			{/if}
			<input type="text" name="bio" placeholder={data?.user.bio || ''} autocomplete="off" />
			<button type="submit">Update Bio</button>
		</form>

		<h2>Add Link</h2>
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
			/>
			<input
				type="text"
				name="title"
				placeholder="Title"
				autocomplete="off"
				value={form?.title || ''}
			/>
			<input type="url" name="url" placeholder="URL" autocomplete="off" value={form?.url || ''} />
			<button type="submit">Add Link</button>
		</form>

		<h2>Links</h2>
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
</div>

<style>
	.container {
		display: flex;
		justify-content: space-between;
		font-family: 'Arial', sans-serif;
		color: #333;
		background-color: #f7f7f7;
	}

	.container .account-info {
		width: 40%;
		padding: 2rem;
	}

	.container .profile-info {
		width: 60%;
		padding: 2rem;
	}

	.container h1 {
		font-size: 2rem;
		margin-bottom: 2rem;
	}

	.container p {
		margin-bottom: 1rem;
	}

	.container form {
		margin-bottom: 1rem;
	}

	.container form button {
		background-color: #4dbbff;
		color: white;
		padding: 0.5rem 1rem;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}

	.container .success {
		color: green;
	}

	.container .error {
		color: red;
	}

	.container select,
	.container input[type="text"],
	.container input[type="url"] {
		margin-bottom: 1rem;
		padding: 0.5rem;
		border-radius: 4px;
		border: 1px solid #ccc;
	}

	.container ul {
		list-style: none;
		padding: 0;
	}

	.container li {
		display: flex;
		align-items: center;
		padding: 0.5rem;
		background-color: #fff;
		border-radius: 4px;
		margin-bottom: 0.5rem;
	}

	.container li a {
		text-decoration: none;
		color: #333;
		margin-right: 1rem;
		display: flex;
		align-items: center;
	}

	.container li a span:first-child {
		font-size: 1.5rem;
		margin-right: 0.5rem;
	}

	.container li form button {
		background-color: #ff4d4d;
		color: white;
		padding: 0.25rem 0.5rem;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}

	.container .logout-button {
		background-color: #ff4d4d;
		color: white;
		padding: 0.5rem 1rem;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}

	@media only screen and (max-width: 768px) {
		.container {
			flex-direction: column;
		}

		.container .account-info,
		.container .profile-info {
			width: 100%;
		}
	}
</style>
