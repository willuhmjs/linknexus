<script lang="ts">
    export let form: FormData;
</script>

<form method="POST">
    <input type="text" name="username" placeholder="Username" />
    <input type="password" name="password" placeholder="Password" />
    <button type="submit">Login</button>
</form>

{#if form}
    <h1>{form.success}</h1>
{/if}