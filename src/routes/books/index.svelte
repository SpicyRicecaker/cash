<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import { bookDefault } from '$lib/types';
	import { selectedBook } from '$lib/stores';

	export const load: Load = async function ({ page, fetch, session, context }) {
		const url: string = '/user/books';
		// First fetch our current user
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
			case 404: {
				// Otherwise try creating user
				const resTwo = await fetch(url, { method: 'PUT' });
				// Then
				return {
					props: {
						books: await resTwo.json()
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

	let start: number;
	let inUpdate: boolean = false;
	const RESPONSE_TIME: number = 300;
	let elapsed: number = RESPONSE_TIME;
	$: progress = Math.min(elapsed / RESPONSE_TIME, RESPONSE_TIME);

	function loop(timestamp: number) {
		elapsed = timestamp - start;
		if (elapsed < RESPONSE_TIME) {
			// After 1000 ms of no changes update
			window.requestAnimationFrame(loop);
		} else {
			fetch('/user/books', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(books)
			}).finally(() => (inUpdate = false));
		}
	}
	let booksValidator: [boolean, boolean, boolean][] = Array(books.length).fill([true, true, true]);

	let first: boolean = true;

	$: sendBook(books);
	function sendBook(_: Book[]) {
		if (first) {
			first = !first;
			return;
		}
		start = performance.now();
		if (!inUpdate) {
			inUpdate = !inUpdate;
			window.requestAnimationFrame(loop);
		}
	}
	function delBook(idx: number) {
		books = [...books.slice(0, idx), ...books.slice(idx + 1)];
		booksValidator = [...booksValidator.slice(0, idx), ...booksValidator.slice(idx + 1)];
	}
	function addBook() {
		books = [...books, bookDefault()];
		booksValidator = [...booksValidator, [true, true, true]];
	}
	function selBook(book: Book) {
		$selectedBook = book;
	}

	// e.g. ('innerHTML', i where i <= books.length, 0 | 1 | 2)
	const handleTypeInputChange = (t: string, i: number, field: number) =>
		(booksValidator[i][field] = t == 'innerHTML' || t == 'selector');
</script>

<div>
	{#if inUpdate}
		<div>Updating...</div>
	{:else}
		<div>Up to date!</div>
	{/if}
	<progress value={progress} />
</div>
<div id="grid">
	{#each books as book, i}
		<div>
			<h2><span bind:innerHTML={book.name} contenteditable="true" /></h2>
			<div>Sourced from: <span bind:innerHTML={book.url} contenteditable="true" /></div>
			<div>
				<div>
					Content Type <input
						on:keyup={() => handleTypeInputChange(book.content.type, i, 0)}
						bind:value={book.content.type}
						class={booksValidator[i][0] ? 'valid' : 'invalid'}
					/>
				</div>
				<div>Content Value <span bind:innerHTML={book.content.value} contenteditable="true" /></div>
				<div>
					Prev Chapter Type <input
						on:keyup={() => handleTypeInputChange(book.prevChapter.type, i, 1)}
						bind:value={book.prevChapter.type}
						class={booksValidator[i][1] ? 'valid' : 'invalid'}
					/>
				</div>
				<div>
					Prev Chapter Value <span bind:innerHTML={book.prevChapter.value} contenteditable="true" />
				</div>
				<div>
					Next Chapter Type <input
						on:keyup={() => handleTypeInputChange(book.nextChapter.type, i, 2)}
						bind:value={book.nextChapter.type}
						class={booksValidator[i][2] ? 'valid' : 'invalid'}
					/>
				</div>
				<div>
					Next Chapter Value <span bind:innerHTML={book.nextChapter.value} contenteditable="true" />
				</div>
			</div>
			<button on:click={() => delBook(i)}><b>delete</b></button>
			<a href="/books/read"><button on:click={() => selBook(book)}>Read!</button></a>
		</div>
	{/each}
	<div>
		<button on:click={() => addBook()}><b>add</b></button>
	</div>
</div>

<style lang="scss">
	#grid {
		display: grid;
		grid-gap: 1rem;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		& > div {
			& span {
				padding: 0 0.5rem 0 0.5rem;
			}
			& > h2 {
				padding: 0;
				margin: 0;
			}
		}
	}

	.valid {
		background-color: lightgreen;
	}

	.invalid {
		background-color: lightcoral;
	}
</style>
