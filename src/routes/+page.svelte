<script lang="ts">
	import type { PageData } from './$types';
	import User from '$lib/modules/User.svelte';
	export let data: PageData;
</script>

<div class="container">
	<User user={data.user} />
</div>

<style>
	.container {
		min-height: 100vh;
		padding: 3rem;
	}
</style>
