<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
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
				console.log('Welcome New User!');
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
	interface Book {
		url: string;
		name: string;
		content: {
			type: string;
			value: string;
		};
		nextChapter: {
			type: string;
			value: string;
		};
		prevChapter: {
			type: string;
			value: string;
		};
	}
	export let books: Book[];

	let start: number;
	let inUpdate: boolean = false;
	let elapsed: number = 1000;
	$: progress = Math.min(elapsed / 1000, 1000);

	function loop(timestamp: number) {
		elapsed = timestamp - start;
		if (elapsed < 1000) {
			console.log('calling next');
			// After 1000 ms of no changes update
			window.requestAnimationFrame(loop);
		} else {
			console.log('sending req to database');
			fetch('/user/books', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(books)
			}).then((res) => {
				console.log(res.status);
				inUpdate = false;
			});
		}
	}

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
	}
	function addBook() {
		books = [
			...books,
			{
				url: '',
				name: '',
				content: {
					type: '',
					value: ''
				},
				nextChapter: {
					type: '',
					value: ''
				},
				prevChapter: {
					type: '',
					value: ''
				}
			}
		];
	}
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
			<div>Title: <span bind:innerHTML={book.name} contenteditable="true" /></div>
			<div>Sourced from: <span bind:innerHTML={book.url} contenteditable="true" /></div>
			<div>
				<div>Content Type <span bind:innerHTML={book.content.type} contenteditable="true" /></div>
				<div>Content Value <span bind:innerHTML={book.content.value} contenteditable="true" /></div>
				<div>
					Prev Chapter Type <span bind:innerHTML={book.prevChapter.type} contenteditable="true" />
				</div>
				<div>
					Prev Chapter Value <span bind:innerHTML={book.prevChapter.value} contenteditable="true" />
				</div>
				<div>
					Next Chapter Type <span bind:innerHTML={book.nextChapter.type} contenteditable="true" />
				</div>
				<div>
					Next Chapter Value <span bind:innerHTML={book.nextChapter.value} contenteditable="true" />
				</div>
			</div>
			<div on:click={() => delBook(i)}><b>delete</b></div>
		</div>
	{/each}
	<div>
		<div on:click={() => addBook()}><b>add</b></div>
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
		}
	}
</style>
