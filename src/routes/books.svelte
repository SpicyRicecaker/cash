<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	export const load: Load = async function ({ page, fetch, session, context }) {
		const url: string = '/user/books';
		// First fetch our current user
		const res = await fetch(url);

		if (res.ok) {
			// If the code is 200 = ok
			return {
				props: {
					books: await res.json()
				}
			};
		} else {
			// Otherwise try creating user
			// await fetch(url, { method: 'PUT' });
		}

		// First let's just delete user
		// await fetch(url, { method: 'DELETE' });
		// Then create a new user

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
