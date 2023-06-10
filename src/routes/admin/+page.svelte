<script lang="ts">
	export let data;
	export let form: ActionData;
	import Theme from '$lib/theme';
	import type { ActionData } from './$types.js';
	import Sortable from 'sortablejs';
	import { onMount } from "svelte";
	import Auth from '$lib/modules/Auth.svelte';
  
	let linksElement: HTMLUListElement;
	let links: { title: string, url: string, icon: string, _id: string }[] = data.user.links;
  
	onMount(() => {
	  Sortable.create(linksElement, {
		group: {
		  name: 'links',
		  put: true
		},
		animation: 200,
		onUpdate: () => {
		  links = Array.from(linksElement.querySelectorAll("li")).map((li) => {
			const linkId = li.querySelector("a")?.id || "";
			return links.find((link) => link?._id === linkId);
		  }).filter(Boolean) as { title: string, url: string, icon: string, _id: string }[];
		},
	  });
	});
  
	function deleteLink(event: Event) {
	  const form = event.target as HTMLFormElement;
	  const formData = new FormData(form);
	  const id = formData.get('id') as string;
	  const linkIndex = links.findIndex((link) => link._id === id);
	  links.splice(linkIndex, 1);
	  const li = linksElement.querySelector(`li:nth-child(${linkIndex + 1})`);
	  li?.remove();
	}
  </script>

{#if data?.user}
  <h1>{data.user.username}</h1>
  <h2>{data.user.email}</h2>
  <p>{data.user.bio || 'No bio!'}</p>
  <p>{Theme[data.user.theme]}</p>
  <form method="POST" action="?/theme">
    {#if form?.ref === 'theme'}
      <p style={form?.error ? 'color: red;' : 'color: green;'}>{form?.message}</p>
    {/if}
    <select name="theme">
      {#each Object.keys(Theme).filter((value) => !isNaN(parseFloat(value))) as theme}
        <option selected={theme == data.user.theme} value={theme}>{Theme[theme]}</option>
      {/each}
    </select>
    <button type="submit">Update Theme</button>
  </form>
  <form method="POST" action="?/logout">
    <button type="submit">Logout</button>
  </form>
  <form method="POST" action="?/bio">
    {#if form?.ref === 'bio'}
      <p style={form?.error ? 'color: red;' : 'color: green;'}>{form?.message}</p>
    {/if}
    <input type="text" name="bio" placeholder={data?.user.bio || ''} autocomplete="off" />
    <button type="submit">Update Bio</button>
  </form>

  <!-- add link -->
  <form method="POST" action="?/link">
    {#if form?.ref === 'link'}
      <p style={form?.error ? 'color: red;' : 'color: green;'}>{form?.message}</p>
    {/if}
    <input
      type="text"
      name="icon"
      placeholder="Emoji"
      autocomplete="off"
      value={form?.icon || '🔗'}
    />
    <input
      type="text"
      name="title"
      placeholder="Title"
      autocomplete="off"
      value={form?.title || ''}
    />
    <input type="url" name="url" placeholder="URL" autocomplete="off" value={form?.url || ''} />
    <button type="submit">Add Link</button>
  </form>

  <!-- display links -->
  <h2>Links</h2>
  <ul bind:this={linksElement}>
    {#if links?.length > 0}
      {#each links as link (link._id)}
        <li>
          <a href={link.url} target="_blank" rel="noopener noreferrer" id={link._id}>
            {link.icon}
            {link.title}
          </a>
          <!-- delete button -->
          <form on:submit|preventDefault={deleteLink}>
            <input type="hidden" name="id" value={link._id} />
            <button type="submit">Delete</button>
          </form>
        </li>
      {/each}
    {/if}
  </ul>
{:else}
  <Auth {form} />
{/if}

<style>
  ul {
    width: 50%;
  }

  li {
    padding: 0.25rem;
    background-color: lightgray;
    margin: 0.25rem;
  }
</style>
