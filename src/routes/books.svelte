<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	export const load: Load = async function ({ page, fetch, session, context }) {
		const url: string = '/user/books';
		// First fetch our current user
		const res = await fetch(url);

		switch (res.status) {
			// if ok
			case 200: {
				console.log('it is oko');
				// Return res
				return {
					props: {
						books: await res.json()
					}
				};
			}
			case 404: {
				console.log("not found so we're making a new one");
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
	$: console.log(books);
</script>

{#each books as book}
	<div>Title: {book.name}</div>
	<div>Sourced from: {book.url}</div>
	<div>
		OPTIONS:
		<div>content: {book.content.value}</div>
		<div>nextchapter: {book.nextChapter.value}</div>
		<div>prevChapter: {book.prevChapter.value}</div>
	</div>
{/each}
