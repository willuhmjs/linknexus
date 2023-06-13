<script lang="ts">
	export let data;
	export let form: ActionData;
	import Theme from '$lib/theme';
	import type { ActionData } from '../$types.js';
</script>

<div class="container">
	<form method="POST" action="?/theme">
		{#if form?.ref === 'theme'}
			<p class={form?.error ? 'error' : 'success'}>{form?.message}</p>
		{/if}
		<select name="theme" required>
			{#each Object.keys(Theme).filter((value) => !isNaN(parseFloat(value))) as theme}
				<option selected={theme == data.user.theme} value={theme}>{Theme[theme]}</option>
			{/each}
		</select>
		<button type="submit">Update Theme</button>
	</form>
</div>
