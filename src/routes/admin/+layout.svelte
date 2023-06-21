<script lang="ts">
	import Nav from "$lib/modules/Nav.svelte";
    import { page } from "$app/stores";
</script>
<svelte:head>
    <style>
        main {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }

        section {
            display: flex;
            flex-direction: column;
            align-items: center;
            flex: 1;
            margin: 0 3rem;
        }

       section > * {
            width: 100%;
        }
    </style>
</svelte:head>
<Nav active={$page.url.pathname}/>
<main>
    <section>
        <slot />
    </section>
    <section>
        asdfsdf
    </section>
</main>