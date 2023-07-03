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
		margin: 2.5rem 1rem;
	}
</style>