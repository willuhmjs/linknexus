<script lang="ts">
    export let data;
</script>
{#if data}
    <h1>{JSON.stringify(data.user)}</h1>
{/if}