<script lang="ts">
	export let form: ActionData;
	import Auth from '$lib/modules/Auth.svelte';
	import type { ActionData } from './$types';
</script>

<div style="padding: 0.5rem;">
	<Auth {form} />
</div>
