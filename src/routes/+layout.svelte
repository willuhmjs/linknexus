<svelte:head>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
	<style>
		@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

		body {
			margin: 0.75rem;
			padding: 0;
			background-color: #F5F5FA;
			color: #292727;
			font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", Oxygen, Cantarell, sans-serif;
			font-weight: 500;
		}
		/*body {
			margin: 0;
			padding: 0;
			background-color: #f7f7f7;
			color: #333;
			font-family: 'Arial', sans-serif;
		}

		.container h1 {
			font-size: 2rem;
			margin-bottom: 1.3rem;
		}

		.container form button {
			background-color: #4dbbff;
			color: white;
			padding: 0.5rem 1rem;
			border: none;
			border-radius: 4px;
			cursor: pointer;
		}

		.container .success {
			color: green;
		}

		.container .error {
			color: red;
		}

		.container select,
		.container input[type='text'],
		.container input[type='url'] {
			margin-bottom: 1rem;
			padding: 0.5rem;
			border-radius: 4px;
			border: 1px solid #ccc;
		}

		.container ul {
			list-style: none;
			padding: 0;
		}

		.container li {
			display: flex;
			align-items: center;
			padding: 0.5rem;
			background-color: #fff;
			border-radius: 4px;
			margin-bottom: 0.5rem;
		}

		.container li a {
			text-decoration: none;
			color: #333;
			margin-right: 1rem;
			display: flex;
			align-items: center;
		}

		.container li a span:first-child {
			font-size: 1.5rem;
			margin-right: 0.5rem;
		}

		.container li form button {
			background-color: #ff4d4d;
			color: white;
			padding: 0.25rem 0.5rem;
			border: none;
			border-radius: 4px;
			cursor: pointer;
		}

		.container .logout-button {
			background-color: #ff4d4d;
			color: white;
			padding: 0.5rem 1rem;
			border: none;
			border-radius: 4px;
			cursor: pointer;
		}

		@media only screen and (max-width: 768px) {
			.container {
				flex-direction: column;
			}

			.container .account-info,
			.container .profile-info {
				width: 100%;
			}
		}*/
	</style>
</svelte:head>
<slot />
