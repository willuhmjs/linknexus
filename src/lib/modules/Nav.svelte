<script lang="ts">
	export let active: string;
</script>

<nav>
	<ul class="navbar">
		<div style="display: inline-block;">
			<li class={active === '/admin/links' ? 'active' : ''}>
				<a href="/admin/links"><i class="fa-solid fa-link" />Links</a>
			</li>
			<li class={active === '/admin/appearance' ? 'active' : ''}>
				<a href="/admin/appearance"><i class="fa-solid fa-eye" />Appearance</a>
			</li>
			<li class={active === '/admin/user' ? 'active' : ''}>
				<a href="/admin/user"><i class="fa-solid fa-user" />User</a>
			</li>
		</div>
		<div style="float: right; display: inline-block;">
			<li>
				<form action="/auth/logout" method="POST">
					<button type="submit"><i class="fa-solid fa-sign-out" />Logout</button>
				</form>
			</li>
		</div>
	</ul>
</nav>

<style>
	nav {
		margin-bottom: 20px;
		padding: 0.75rem;
		background-color: #fafafa;
		border: 2px solid #e8e8ed;
		border-radius: 0.5rem;
		font-size: 1rem;
	}

	nav ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	nav li {
		display: inline-block;
		margin-right: 3px;
	}

	nav li.active a, nav li.active button {
		background-color: #e5e5e5;
		color: inherit;
	}

	nav li:last-child {
		margin-right: 0;
	}

	nav li a, nav li button {
		display: inline-block;
		background-color: transparent;
		font-size: 1rem;
		color: #676b5f;
		text-decoration: none;
		padding: 0.75rem 1rem;
		border-bottom: 2px solid transparent;
		border-radius: 10px;
	}

	nav li a i, nav li button i {
		margin-right: 0.5rem;
	}

	nav li:hover a, nav li:hover button {
		background-color: #e5e5e5;
		filter: brightness(1);
	}

	@media screen and (max-width: 400px) {
		/* vertical navbar */
		nav {
			padding: 0.5rem;
		}

		nav li {
			display: block;
			margin-right: 0;
			margin-bottom: 3px;
			width: 100%;
		}

		nav li a {
			display: block;
			padding: 0.75rem;
			border: none;
			border-bottom: 2px solid transparent;
		}
	}
</style>
