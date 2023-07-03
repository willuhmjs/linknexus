<script lang="ts">
	import Nav from '$lib/modules/Nav.svelte';
	import User from '$lib/modules/User.svelte';
	import { page } from '$app/stores';
	export let data;
</script>

<svelte:head>
	<style>
		.mcontainer {
		}

		main {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
		}

		section {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin: 0 3rem;
			overflow: auto;
			max-height: calc(100vh - 8rem); /* Adjust the value as needed */
		}

		section:first-child {
			flex: 3;
		}

		section:last-child {
			flex: 2;
		}

		section > * {
			width: 100%;
		}

		/* Media query for screens with a maximum width of 768px */
		@media (max-width: 768px) {
			main {
				flex-direction: column;
			}

			section {
				margin: 1rem;
				max-height: none;
			}
		}
	</style>
</svelte:head>

<div class="mcontainer">
	<Nav active={$page.url.pathname} />
	<main>
		<section>
			<slot />
		</section>
		<section><User user={data?.user} /></section>
	</main>
</div>
