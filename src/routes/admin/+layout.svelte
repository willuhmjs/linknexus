<script lang="ts">
	import Nav from '$lib/modules/Nav.svelte';
	import User from '$lib/modules/User.svelte';
	import { page } from '$app/stores';
	import wuser from '$lib/user';
	export let data;
	if (data.user) {
		$wuser = data.user;
	}
</script>

<svelte:head>
	<style>
		main {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			margin: 2rem 0;
		}

		section {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin: 0 3rem;
			overflow: auto;
			height: 100%;
		}

		section:first-child {
			flex: 3;
		}

		section:last-child {
			flex: 2;
			border-radius: 2rem;
			border: 2px solid black;
			height: calc(90vh - 6rem);
		}

		section:last-child > div.container {
			display: block;
			transform: scale(0.8);
  			transform-origin: 0 1;
		}

		section > * {
			width: 100%;
		}

		@media (max-width: 768px) {
			main {
				flex-direction: column;
			}

			section {
				margin: 1rem;
				max-height: none;
			}
		}

		@media (min-width: 769px) {
			section:last-child {
				flex: 1;
			}
		}

		@media (min-width: 1200px) {
			main {
				gap: 10rem;
			}
		}
	</style>
</svelte:head>

<Nav active={$page.url.pathname} />
<main>
	<section>
		<slot />
	</section>
	<section style="background-color: {$wuser.theme.background.color};">
		<User user={$wuser} />
	</section>
</main>
