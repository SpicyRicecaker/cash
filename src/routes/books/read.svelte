<script lang="ts">
	import { selectedBook } from '$lib/stores';
	import { onMount } from 'svelte';

	// onMount(() => {

	// });
	// interface Book {
	// 	content: string;
	// 	prev_chapter: string;
	// 	next_chapter: string;
	// }
	// let book: Book;
</script>

<p>TOODO</p>
every time that selected book.url changes....

Need to fetch {$selectedBook.url},
dom = dom.parse(res)
for [1, 2, 3] .
	match res.type
		select
		innerhtml

map our returns onto interface book
<!-- <div id="book">
		{book.content}
	</div>
	<nav id="nav">
		<a href={book.prev_chapter} id="prev_chapter">Prev</a>
		<a href={book.next_chapter} id="next_chapter">Next</a>
	</nav> -->
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
