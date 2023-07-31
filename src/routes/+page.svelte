<script lang="ts">
	import type { PageData } from './$types';
	import User from '$lib/modules/User.svelte';
	export let data: PageData;
</script>

<div class="container" style="--bg-color: {data.user.theme.background.color}">
	<User user={data.user} />
</div>

<style>
	.container {
		background-color: var(--bg-color);
		min-height: 100vh;
		padding: 3rem;
	}
</style>
