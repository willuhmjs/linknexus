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
			flex: 2;
		}

		section:last-child {
			flex: 1;

		}


		section:last-child div.container {
			display: block;
			transform: scale(0.6);
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
