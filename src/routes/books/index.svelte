<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import { bookDefault } from '$lib/types';
	import { selectedBook } from '$lib/stores';

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
			// Shouldn't ever 404 i don't think
			// case 404: {
			// 	// const resTwo = await fetch('', { method: 'PUT' });
			// 	// Then
			// 	return {
			// 		props: {
			// 			books: []
			// 		}
			// 	};
			// }
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

	let selected: number = -1;
	let editMode: boolean = false;

	let booksValidator: [boolean, boolean, boolean, boolean] = [true, true, true, false];

	function delBook(idx: number) {
		books = [...books.slice(0, idx), ...books.slice(idx + 1)];
		// booksValidator = [...booksValidator.slice(0, idx), ...booksValidator.slice(idx + 1)];
	}
	function addBook() {
		// books = [...books, bookDefault()];
		// 	booksValidator = [...booksValidator, [true, true, true, false]];
	}
	function selBook(book: Book) {
		$selectedBook = book;
	}

	// e.g. ('innerHTML', i where i <= books.length, 0 | 1 | 2)
	const handleTypeInputChange = (t: string, field: number) =>
		(booksValidator[field] = t == 'innerHTML' || t == 'selector');
</script>

<div>
	{#if selected != -1}
		<div id="form">
			<label for="name">name</label>
			<input bind:value={books[selected].name} id="name" />

			<label for="url">name</label>
			<input bind:value={books[selected].url} id="url" />

			<label for="content-type">content type</label>
			<input
				on:keyup={() => handleTypeInputChange(books[selected].content.type, 0)}
				bind:value={books[selected].content.type}
				class={booksValidator[0] ? 'valid' : 'invalid'}
				id="content-type"
			/>

			<label for="content-value">content value</label>
			<input bind:value={books[selected].content.value} id="content-value" />

			<label for="prev-chapter-type">prev chapter type</label>
			<input
				on:keyup={() => handleTypeInputChange(books[selected].prevChapter.type, 1)}
				bind:value={books[selected].prevChapter.type}
				class={booksValidator[1] ? 'valid' : 'invalid'}
				id="prev-chapter-type"
			/>

			<label for="prev-chapter-value">prev chapter value</label>
			<input bind:value={books[selected].prevChapter.value} id="prev-chapter-value" />

			<label for="next-chapter-type">next chapter type</label>
			<input
				on:keyup={() => handleTypeInputChange(books[selected].nextChapter.type, 2)}
				bind:value={books[selected].nextChapter.type}
				class={booksValidator[0] ? 'valid' : 'invalid'}
				id="next-chapter-type"
			/>

			<label for="next-chapter-value">next chapter value</label>
			<input bind:value={books[selected].nextChapter.value} id="next-chapter-value" />

			<button>✕</button>
			<button>Submit</button>
		</div>
	{/if}
	<div id="grid">
		{#each books as book, i}
			<div class="book">
				<h2>{book.name}</h2>
				<div>{book.url} /></div>
				<a href="/books/read"><button on:click={() => selBook(book)}>Read!</button></a>
				{#if selected != -1}
					<button on:click={() => delBook(i)}>✕</button>
				{/if}
			</div>
		{/each}
		{#if selected != -1}
			<div class="book">
				<button on:click={() => addBook()}>add</button>
			</div>
		{/if}
	</div>
	{#if editMode}
		<button on:click={() => (editMode = !editMode)}>Edit Mode</button>
	{:else}
		<button on:click={() => (editMode = !editMode)}>No More Edit Mode</button>
	{/if}
</div>

<style lang="scss">
	#form {
		position: absolute;
		z-index: 150;
		background-color: var(--background-color);
		width: 100%;
		height: 100%;
	}
	#grid {
		display: grid;
		grid-gap: 1rem;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		& > .book {
			background-color: var(--yel);
			& span {
				padding: 0 0.5rem 0 0.5rem;
			}
			& > h2 {
				padding: 0;
				margin: 0;
			}
		}
	}
	input {
		outline: none;
		border: 0.1rem solid gainsboro;
		padding: 1rem;
		border-radius: 2rem;
		color: var(--foreground-color);
		background-color: var(--background-color);
		transition: 0.2s;
		border: 0.1rem solid gray;
		/* border: 2px inset; */
		&:focus {
			border: 0.1rem solid #ababab;
			box-shadow: 0 0 0.2rem gray;
		}
		&.valid {
			border-color: var(--grn);
		}
		&.invalid {
			border-color: var(--red);
		}
	}
	progress {
		display: block;
		width: 100%;
		padding: 0;
		margin: 0;
		&.progressing {
			visibility: visible;
		}
		&.regressing {
			visibility: hidden;
		}
	}

	button {
		border: none;
		text-decoration: none;
		padding: 1rem;
		color: var(--background-color);
		background-color: var(--foreground-color);
	}
</style>
