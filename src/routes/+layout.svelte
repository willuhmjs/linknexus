<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
		integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
		crossorigin="anonymous"
		referrerpolicy="no-referrer"
	/>
	<style>
		@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

		:root {
			--good: #45e645;
			--bad: #ff4d4d;
			--primary: #4dbbff;
		}

		body {
			margin: 0;
			padding: 0;
			min-height: 100vh;
			background-color: #f5f5fa;
			color: #292727;
			font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Ubuntu,
				'Helvetica Neue', Oxygen, Cantarell, sans-serif;
			font-weight: 500;
		}

		* {
			box-sizing: border-box;
		}

		.success {
			color: var(--good);
		}

		.error {
			color: var(--bad);
		}

		.bt-good {
			background-color: var(--good);
			color: white;
		}

		.bt-bad {
			color: white;
			background-color: var(--bad);
		}

		.bt-primary {
			color: white;
			background-color: var(--primary);
		}

		button {
			padding: 0.5rem 1rem;
			border: none;
			border-radius: 4px;
			cursor: pointer;
			margin-top: auto;
		}

		select,
		input {
			border-radius: 4px;
			border: 1px solid #ccc;
			min-width: 0;
			padding: 0.5rem;
		}

		/* first h1 and h2 element have no margin top */
		h1:first-child,
		h2:first-child {
			margin-top: 0;
		}
	</style>
</svelte:head>
<slot />
