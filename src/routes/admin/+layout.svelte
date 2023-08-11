<script lang="ts">
	import Nav from '$lib/modules/Nav.svelte';
	import User from '$lib/modules/User.svelte';
	import { page } from '$app/stores';
	import wuser from '$lib/user';
	import lighten from '$lib/lighten.js';
	export let data;
	if (data.user) {
		$wuser = data.user;
	}
</script>

<svelte:head>
	<!-- favicon using svelte-gravatar component -->
	<style>
		main {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			height: calc(100vh - 8rem);
		}

		section {
			padding: 0 3rem;
			-ms-overflow-style: none; /* Internet Explorer 10+ */
			scrollbar-width: none; /* Firefox */
		}

		section::-webkit-scrollbar {
			display: none; /* Safari and Chrome */
		}

		section:first-child {
			flex: 2;
			overflow-y: auto;
			display: flex;
			justify-content: center;
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
			transform: scale(0.75);
			transform-origin: top;
			padding: 2rem 1rem;
		}

		section:last-child div.uw {
			aspect-ratio: 1/2;
			border: 0.9rem solid black;
			border-radius: 2rem;
			overflow-y: scroll;
			-ms-overflow-style: none; /* Internet Explorer 10+ */
			scrollbar-width: none; /* Firefox */
		}
		section:last-child div.uw::-webkit-scrollbar {
			display: none; /* Safari and Chrome */
		}

		section > * {
			width: 100%;
		}

		@media screen and (max-width: 500px) {
			main {
				display: block;
			}

			section {
				margin: 0;
				padding: 0 1rem;
				max-height: none;
			}

			section:last-child div.uw {
				max-width: 100%;
				margin: 3rem 0;
			}
		}

		@media screen and (min-width: 501px) and (max-width: 800px) {
			main {
				display: block;
			}

			section {
				margin: 0;
				padding: 0 1rem;
				max-height: none;
			}

			section:last-child div.uw {
				max-width: 50%;
				margin: 3rem 0;
			}
		}

		@media screen and (min-width: 1051px) {
			section:last-child {
				border-left: 2px solid #e8e8ed;
			}
		}

		@media screen and (min-width: 801px) and (max-width: 1200px) {
			section:last-child div.uw {
				max-width: 80%;
			}
		}

		@media screen and (min-width: 1201px) and (max-width: 1400px) {
			section:first-child div.gw {
				max-width: 80%;
			}

			section:last-child div.uw {
				max-width: 70%;
			}
		}

		@media (min-width: 1401px) {
			section:first-child div.gw {
				max-width: 70%;
			}

			section:last-child div.uw {
				max-width: 65%;
			}

			section:last-child div.container {
				transform: scale(0.9);
			}
		}
	</style>
</svelte:head>

<div style="padding: 0.5rem;">
	<Nav active={$page.url.pathname} />
	<main>
		<section>
			<div class="gw">
				<slot />
			</div>
		</section>
		<section>
			<div
				style={$wuser.theme.background.type == '1'
					? `background: linear-gradient(0deg, ${lighten($wuser.theme.background.color, 30)} 0%, ${
							$wuser.theme.background.color
					  } 100%);`
					: `background: ${$wuser.theme.background.color};`}
				class="uw"
			>
				<User user={$wuser} />
			</div>
		</section>
	</main>
</div>
