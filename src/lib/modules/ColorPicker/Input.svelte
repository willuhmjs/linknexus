<script lang="ts">
	export let labelWrapper: HTMLLabelElement;
	export let hex: string;
	/* svelte-ignore unused-export-let */
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<label
	bind:this={labelWrapper}
	on:click|preventDefault={() => {
		/* prevent default behavior on safari */
	}}
	on:mousedown|preventDefault={() => {
		/* prevent default behavior on safari */
	}}
>
	<div class="colorBox">
		<input
			type="color"
			value={hex}
			on:click|preventDefault={() => {
				/* prevent default behavior on most browsers */
			}}
			on:mousedown|preventDefault={() => {
				/* prevent default behavior on safari */
			}}
			aria-haspopup="dialog"
			required
		/>
	</div>
</label>

<style>
	.colorBox {
		width: 50px;
		height: 50px;
		border-radius: 1rem;
		overflow: hidden;
		border: 2px solid #e5e5e5;
	}

	.colorBox > input[type='color'] {
		border: 0;
		padding: 0;
		width: 200%;
		height: 200%;
		cursor: pointer;
		transform: translate(-25%, -25%);
	}

	input:focus {
		outline: 2px solid var(--focus-color, blue);
		outline-offset: 15px;
	}
</style>
