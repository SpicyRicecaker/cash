<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import EditBook from '$lib/edit-book.svelte';

	export const load: Load = async function ({ page, fetch, session, context }) {
		// First fetch our current user
		const url: string = '/user/books';
		const res = await fetch(url);

		switch (res.status) {
			// if ok
			case 200: {
				// Return res
				return {
					props: {
						books: await res.json()
					}
				};
			}
			default: {
				break;
			}
		}
		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
	};
</script>

<script lang="ts">
	import type { Book } from '$lib/types';
	export let books: Book[];

	let editMode: boolean = false;
	let selected: number = -1;

	async function delBook(i: number, _id: string) {
		const res = await fetch('/user/books', {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(_id)
		});
		if (res.ok) {
			books = [...books.slice(0, i), ...books.slice(i + 1)];
		}
	}
	async function addBook() {
		const res = await fetch('/user/books', { method: 'PUT' });
		if (res.ok) {
			const book = await res.json();
			// Insert this book in
			books = [...books, book];
		}
	}

	async function modifyBook(e: CustomEvent<Book>) {
		// fetch res
		const res = await fetch('/user/books', {
			method: 'POST',
			body: JSON.stringify(e.detail),
			headers: { 'Content-Type': 'application/json' }
		});
		if (res.ok) {
			// Update home array
			books[selected] = e.detail;
		}
		// Then cancel
		cancel();
	}

	function cancel() {
		selected = -1;
	}
</script>

<div class="main">
	{#if selected != -1}
		<EditBook book={books[selected]} on:submit={modifyBook} on:cancel={cancel} />
	{/if}
	<div class="header">
		<button on:click={() => (editMode = !editMode)}>
			{#if editMode}
				✕
			{:else}
				⚙
			{/if}
		</button>
	</div>
	<div id="grid">
		{#each books as book, i}
			{#if editMode}
				<div on:click={() => (selected = i)} class="book">
					<h2>{book.name}</h2>
					<div>{book.url}</div>
					<button
						class="delete-book"
						on:click={(e) => {
							e.stopPropagation();
							delBook(i, book._id);
						}}>✕</button
					>
				</div>
			{:else}
				<a href="/books/{book._id}" class="book">
					<h2>{book.name}</h2>
					<div>{book.url}</div>
				</a>
			{/if}
		{/each}
		{#if editMode}
			<button class="add-book" on:click={() => addBook()}><div>+</div></button>
		{/if}
	</div>
</div>

<style lang="scss">
	.main {
		margin: 0 1rem 1rem 1rem;
	}
	#grid {
		display: grid;
		grid-gap: 1rem;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		& > .book {
			background-color: var(--foreground-color);
			& > h2 {
				padding: 1rem 1rem 0rem 1rem;
				margin: 0;
				font-size: 3rem;
				word-break: break-word;
				text-align: right;
			}
			& > div {
				padding: 0rem 1rem 1rem 1rem;
				background-color: var(--foreground-color);
				text-align: right;
				opacity: 60%;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
			}
		}
		& > a.book {
			outline: none;
			text-decoration: none;

			-moz-user-select: none;
			-webkit-user-select: none;
			&:link {
				color: var(--background-color);
			}
			&:visited {
				color: var(--background-color);
			}
		}
		& > div.book {
			color: var(--background-color);
			position: relative;

			& > button {
				border: none;
				text-decoration: none;
				&:hover {
					cursor: pointer;
				}
				&.delete-book {
					position: absolute;
					top: 0;
					right: 0;
				}
			}
		}
		& > .add-book {
			min-height: 100px;
			display: grid;

			background-color: var(--foreground-color);
			color: var(--background-color);

			border: none;
			text-decoration: none;
			justify-content: center;
			align-content: center;
			& > div {
				font-size: 3rem;
				line-height: 1.8rem;
			}
			&:hover {
				cursor: pointer;
			}
		}
	}
	.header {
		display: grid;
		justify-items: center;
		margin-bottom: 0.5rem;
		// grid-auto-columns: min-content;
		// grid-auto-rows: min-content;
		& > button {
			transition: 1s;
			&:hover {
				cursor: pointer;
			}

			border: none;
			text-decoration: none;

			font-size: 2rem;

			color: var(--foreground-color);
			background-color: var(--background-color);
		}
	}
</style>
