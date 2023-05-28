<script lang="ts">
    export let data;
</script>
{#if data}
    <h1>{data.username}</h1>
{/if}