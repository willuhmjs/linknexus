<script lang="ts">
    export let data;
    import Theme from "$lib/theme";
</script>
{#if data}
    <h1>{data.user.username}</h1>
    <h2>{data.user.email}</h2>
    <p>{data.user.bio || "No bio!"}</p>
    <p>{Theme[data.user.theme]}</p>

{/if}