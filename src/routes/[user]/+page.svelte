<script lang="ts">
	import type { PageData } from './$types';
	import User from '$lib/modules/User.svelte';
	export let data: PageData;
</script>

<User user={data.user} />
