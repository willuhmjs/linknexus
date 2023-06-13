<script lang="ts">
	export let form: ActionData;
	import Auth from '$lib/modules/Auth.svelte';
	import type { ActionData } from './$types';
</script>

<Auth {form} />
