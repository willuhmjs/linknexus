<script lang="ts">
	import type { IUser } from '$lib/types.js';
	export let data: { message: string; error: boolean; user: IUser };
	import Gravatar from 'svelte-gravatar';
	import api from '$lib/api';
	import wuser from '$lib/user';

	import ColorPicker from 'svelte-awesome-color-picker';
	import Input from '$lib/modules/ColorPicker/Input.svelte';
	import Wrapper from '$lib/modules/ColorPicker/Wrapper.svelte';

	let metaColor: string = $wuser.meta.color;
</script>

	<h1>Account Information</h1>
	<div class="category">
		<Gravatar
			email={$wuser.email}
			size={150}
			default="mp"
			rating="g"
			style="border-radius: 50%; margin: 0.5rem;"
		/>
		<p class="error">{data?.message || ''}</p>
		<form on:submit|preventDefault={async (e) => (data = await api('/admin/user/account', e.target))}>
			<h4>Username</h4>
			<input type="text" name="username" value={data?.user.username || ''} autocomplete="off" />
			<h4>Bio</h4>
			<input type="text" name="bio" value={data?.user.bio || ''} autocomplete="off" />
			<h4>Email</h4>
			<p>{$wuser.email}</p>
			<button type="submit" class="bt-primary">Update Account</button>
		</form>
	</div>

	<h1>Meta Information</h1>
	<div class="category">
		<form on:submit|preventDefault={async (e) => (data = await api('/admin/user/meta', e.target))}>
			<h4>Title</h4>
			<input type="text" name="metaTitle" value={data?.user.meta.title || ''} autocomplete="off" />

			<h4>Description</h4>
			<input
				type="text"
				name="metaDescription"
				value={data?.user.meta.description || ''}
				autocomplete="off"
			/>

			<h4>Image</h4>
			<input
				type="text"
				name="metaImage"
				value={data?.user.meta.image || ''}
				autocomplete="off"
			/>

			<h4>Color</h4>
			<div style="margin-bottom: 1rem">
				<ColorPicker
					bind:hex={metaColor}
					canChangeMode={false}
					components={{ input: Input, wrapper: Wrapper }}
				/>
			</div>
			<input type="hidden" name="metaColor" value={metaColor} />
			<button type="submit" class="bt-primary">Update Meta</button>
		</form>
	</div>

<style>
	.category {
		padding: 0.5rem;
		background-color: #fafafa;
		border: 2px solid #e8e8ed;
		border-radius: 0.5rem;
	}

	.category h4:first-child {
		margin-top: 5px;
	}

	.category h4 {
		margin-bottom: 0.7rem;
	}

	input,
	form button {
		width: 100%;
	}

	form button {
		margin: 0.15rem 0;
	}
</style>
