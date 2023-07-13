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
			height: calc(100vh - 10rem);
		}

		section {
			margin: 0 3rem;
		}

		section:first-child {
			flex: 2;
			overflow-y: auto;
		}

		section:last-child {
			display: flex;
			flex-direction: column;
			justify-content: center;
			flex: 1;
			align-items: center;

		}


		section:last-child div.container {
			display: block;
			transform: scale(0.7);
  			transform-origin: 0 1;
		}

		section:last-child div.uw {
			width: 200px;
			height: 400px;
			border-radius: 2rem;
			border: 4px solid black;
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
	</style>
</svelte:head>

<Nav active={$page.url.pathname} />
<main>
	<section>
		<slot />
	</section>
	<section style="background-color: {$wuser.theme.background.color};">
		<div class='uw'>
		<User user={$wuser} />
		</div>
	</section>
</main>
