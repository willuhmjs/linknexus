<script lang="ts">
	import type { PageData } from './$types';
	import User from '$lib/modules/User.svelte';
	import lighten from '$lib/lighten';
	export let data: PageData;
</script>

<div
	class="container"
	style="--bg-color: {data.user.theme.background.type == 1
		? `linear-gradient(0deg, ${lighten(data.user.theme.background.color, 30)} 0%, ${
				data.user.theme.background.color
		  } 100%);`
		: `${data.user.theme.background.color};`}"
>
	<User user={data.user} />
</div>

<style>
	.container {
		min-height: 100vh;
		padding: 3rem;
		background: var(--bg-color, #f5f5fa);
	}
</style>
