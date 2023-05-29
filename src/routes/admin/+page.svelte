<script lang="ts">
    export let data;
</script>
{#if data}
    <h1>{data.user}</h1>
{/if}