<script lang="ts">
	import { SpecialProps, type IUser, ButtonStyle } from '$lib/types';
	import Gravatar from 'svelte-gravatar';
	export let user: IUser;
</script>

<div class="container" style="--bg-color: {user.theme.background.color}; --font-color: {user.theme.fontColor}; --bt-color: {user.theme.button.color}; --bt-font-color: {user.theme.button.fontColor}; --font-color: {user.theme.fontColor}; --bt-style: {ButtonStyle[user.theme.button.style]}">
	<Gravatar email={user.email} size={120} default="mp" rating="pg" style="border-radius: 50%;" />

	<h1>@{user.username}</h1>
	{#if user.bio}
		<p>{user.bio}</p>
	{/if}
	<ul class="linkContainer">
		{#each user.links as link}
			<li class="linkItem">
				<a href={link.url} target="_blank" rel="noopener noreferrer">
					{link.title}
				</a>
			</li>
		{/each}
	</ul>
	<ul class="specialContainer">
		{#each user.specials as link}
			<li class="specialItem">
				<a
					href={SpecialProps[link.type].template(link.username)}
					target="_blank"
					rel="noopener noreferrer"
				>
					<i class="fa-brands {SpecialProps[link.type].icon}" />
				</a>
			</li>
		{/each}
	</ul>
</div>
<style>
	div.container {
		text-align: center;
		max-width: 632px;
		margin: 0 auto;
		background-color: var(--bg-color, #f5f5fa);
		color: var(--font-color, #333);
		padding: 2rem;
		height: 100%;
		width: 100%;
	}

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	li.linkItem {
		display: flex;
		align-items: center;
		padding: 0.5rem;
		background-color: var(--bt-color, #fafafa);
		border: 2px var(--bt-style) #e8e8ed;
		border-radius: 0.5rem;
		margin: 0.5rem 0;
	}

	li.linkItem a {
		text-decoration: none;
		color: var(--bt-font-color, #333);
		display: block;
		width: 100%;
	}

	li.specialItem a {
		font-size: 2rem;
		color: black;
		margin: 0 0.5rem;
		color: var(--font-color);
	}

	.linkContainer {
		margin-top: 2rem;
	}

	.specialContainer {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 2rem;
		overflow: auto;
		flex-wrap: wrap;
		line-height: 3rem;
	}

	h1 {
		margin-top: 1rem;
		font-size: 1.25rem;
	}

	p {
		margin-top: 0.5rem;
		font-size: 1rem;
	}
</style>