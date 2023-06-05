<script lang="ts">
    export let data;
    import Theme from "$lib/theme";
</script>

{#if data?.authorized}
    <h1>{data.user.username}</h1>
    <h2>{data.user.email}</h2>
    <p>{data.user.bio || "No bio!"}</p>
    <p>{Theme[data.user.theme]}</p>

    <form method="POST" action="?/special">
        <input type="submit"/>
    </form>
{:else}
    <h2>Login</h2>
    <form method="POST" action="?/login">
        <input type="text" name="username" placeholder="Username" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Login</button>
    </form>
    <h2>Register</h2>
    <form method="POST" action="?/register">
        <input type="text" name="username" placeholder="Username" />
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Login</button>
    </form>
{/if}

