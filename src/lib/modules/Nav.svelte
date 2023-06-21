<script lang="ts">
	export let active: string;
</script>

<nav>
	<ul class="navbar">
		<li class={active==="/admin/links" ? "active" : ""}><a href="/admin/links"><i class="fa-solid fa-link"></i>Links</a></li>
		<li class={active==="/admin/appearance" ? "active" : ""}><a href="/admin/appearance"><i class="fa-solid fa-eye"></i>Appearance</a></li>
		<li class={active==="/admin/user" ? "active" : ""}><a href="/admin/user"><i class="fa-solid fa-user"></i>User</a></li>
	</ul>
</nav>

<style>
	nav {
		margin-bottom: 20px;
		padding: 0.75rem;
		background-color: #fafafa;
		border: 2px solid #e8e8ed;
		border-radius: 1rem;
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

	nav li .active, nav li.active a {
		background-color: #e5e5e5;
		color: inherit;
	}

	nav li:last-child {
		margin-right: 0;
	}

	nav li a {
		display: inline-block;
		color: #676B5F;
		text-decoration: none;
		padding: 0.75rem 1rem;
		border-bottom: 2px solid transparent;
		border-radius: 10px;
	}

	nav li a i {
		margin-right: 0.5rem;
	}

	nav li a:hover {
		background-color: #e5e5e5;
	}

	nav li:hover a {
		background-color: #e5e5e5;
	}
</style>

