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
			section:first-child {
				margin: 0 9rem;
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
