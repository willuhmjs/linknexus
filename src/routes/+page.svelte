<script lang="ts">
    import type { PageData } from './$types';
    import User from "$lib/modules/User.svelte";
    export let data: PageData;
</script>

{#if data.saas}
    <h1>this is a service</h1>
{:else}
    <User user={data.user} />
{/if}