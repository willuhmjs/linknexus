<script lang="ts">
	import Nav from '$lib/modules/Nav.svelte';
	import User from '$lib/modules/User.svelte';
	import { page } from '$app/stores';
	import wuser from '$lib/user';
	export let data;
	$wuser = data.user;
</script>

<svelte:head>
	<style>
		.mcontainer {
		}

		main {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			margin: 3rem 0;
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

		@media (min-width: 1500px) {
			section {
				margin: 0 7rem;
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
		<section><User user={$wuser} /></section>
	</main>
</div>
