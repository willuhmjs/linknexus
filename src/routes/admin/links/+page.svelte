<script lang="ts">
  import { SpecialLink } from '$lib/types.js';
  export let data;
  import wuser from '$lib/user';
  import LinkEditor from '$lib/modules/Editor/LinkEditor.svelte';
  import SpecialEditor from '$lib/modules/Editor/SpecialEditor.svelte';
  import api from '$lib/api';
  //let links: { title: string; url: string; _id: string }[] = $wuser?.links;
  //let specials: { type: SpecialLink; username: string; _id: string }[] = $wuser?.specials;
  $: links = $wuser.links;
  $: specials = $wuser.specials;
  let showAddLink = false;
  function toggleAddLink() {
    showAddLink = !showAddLink;
  }
</script>

<button class="bt-primary" style="width: 100%;" on:click={toggleAddLink}>
  <i class="fa-solid fa-plus" />Add Link
</button>

{#if showAddLink}
<div class="addLink">
  {#if data?.message && data?.error}
    <p class="error">{data?.message}</p>
  {/if}
  <form on:submit|preventDefault={async (e) => (data = await api('/admin/links/link', e.target))}>
    <div class="form-row">
      <label for="url">
        <span>Title</span>
      <input
        id="title"
        type="text"
        name="title"
        placeholder="My Awesome Website"
        autocomplete="off"
        value={data?.title || ''}
        required
      />
      </label>
      <label for="url">
        <span>URL</span>
        <input
          required
          id="url"
          type="url"
          name="url"
          placeholder="https://willuhmjs.com"
          autocomplete="off"
          value={data?.url || ''}
        />
      </label>
      <button class="bt-primary" type="submit">
        <i class="fa-solid fa-user-group" />Add Hyperlink
      </button>
    </div>
  </form>
  <hr />
  <div class="or-divider">OR</div>
  <hr />
  <form on:submit|preventDefault={async (e) => (data = await api('/admin/links/special', e.target))}>
    <div class="form-row">
    <label for="type">
      <span>Type</span>
      <select name="type" required>
        {#each Object.keys(SpecialLink).filter((value) => !isNaN(parseFloat(value))) as type}
          <option value={type}>
            {SpecialLink[parseInt(type)]}
          </option>
        {/each}
      </select>
    </label>
    <label for="username">
      <span>Username</span>
      <input required type="text" name="username" placeholder="willuhmjs" autocomplete="off" />
    </label>
    <button class="bt-primary" type="submit">
      <i class="fa-solid fa-user-group" />Add Social Link
    </button>
  </div>
  </form>
</div>
{/if}

<h2><i class="fa-solid fa-arrow-up-right-from-square" />Hyperlinks</h2>
<LinkEditor {links} />

<h2><i class="fa-solid fa-user-group" />Social Links</h2>
<SpecialEditor {specials} />

<style>
	.addLink {
		padding: 0.7rem;
		background-color: #fafafa;
		border: 2px solid #e8e8ed;
		border-radius: 0.5rem;
		margin-top: 1rem;
	}

	.addLink > p {
		margin-top: 0;
	}

	hr:first-of-type {
		margin-top: 1.2rem;
	}

	hr:last-of-type {
		margin-bottom: 1.2rem;
	}

	.or-divider {
		margin: 0.25rem 0;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #999;
		font-weight: bold;
	}

	form {
		margin: 0.5rem 0;
		gap: 0.25rem;
	}

	.form-row {
    display: flex;
    gap: 0.25rem;
    align-items: flex-end;
    width: 100%;
  }

	label {
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	label > span {
		margin-bottom: 0.5rem;
		font-size: 0.85rem;
	}

	i {
		margin-right: 10px;
	}

	h2 {
		margin-bottom: 0.5rem;
	}

	@media (max-width: 900px) {
		.addLink {
			padding: 0.5rem;
		}

		form {
			flex-direction: column;
		}


    .form-row {
      flex-direction: column;
    }

		label {
			flex: 1;
      width: 100%;
      margin-bottom: 0.5rem;
		}

		label > span {
			margin-bottom: 0.25rem;
		}

		.or-divider {
			margin: 0.25rem 0;
		}

		form > * {
			margin: 0.25rem 0;
		}

    button {
    width: 100%;
  }
	}
</style>
