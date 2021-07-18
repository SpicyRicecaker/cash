<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	export const load: Load = async function ({ page, fetch, session, context }) {
		console.log('no clue what these do', page, fetch, session, context);

		const url: string = 'api/books/current';
		const res = await fetch(url);

		if (res.ok) {
			return {
				props: {
					current: await res.json()
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
	};
</script>

<script lang="ts">
	interface Book {
		content: string;
		prev_chapter: string;
		next_chapter: string;
	}
	export let book: Book;
</script>

<div id="content">
	<div id="book">
		{book.content}
	</div>
	<nav id="nav">
		<a href={book.prev_chapter} id="prev_chapter">Prev</a>
		<a href={book.next_chapter} id="next_chapter">Next</a>
	</nav>
	<!-- <div id="theme-circle">
		<select name="theme" id="theme">
			<option value="gruvbox-material-light" selected>Gruvbox Material Light</option>
			<option value="gruvbox-material-dark">Gruvbox Material Dark</option>
			<option value="solarized-light">Solarized Light</option>
			<option value="solarized-dark">Solarized Dark</option>
		</select>
		<span>
			<span>&nbsp;</span>
			<span>&nbsp;</span>
			<span>&nbsp;</span>
			<span>&nbsp;</span>
			<span>&nbsp;</span>
			<span>&nbsp;</span>
		</span>
	</div> -->
</div>
