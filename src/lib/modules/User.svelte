<script lang="ts">
	import type { IUser } from '$lib/types';

	export let user: IUser;
</script>

<h1>{user.username}</h1>
{#if user.bio}
	<p>{user.bio}</p>
{/if}
<ul>
	{#each user.links as link}
		<li>
			<a href={link.url} target="_blank" rel="noopener noreferrer">
				{link.title}
			</a>
		</li>
	{/each}
</ul>
