<script context="module" lang="ts">
	import type { Load, LoadOutput } from '@sveltejs/kit';
	// Basically, load the configs of the book based on the url based on user.
	// This is very good because it means that we don't have to store
	// Heavy objects that are almost neva used in stores
	export const load: Load = async ({ page, fetch, session, stuff }) => {
		try {
			// Get the url from our url
			const url = `/user/book-individual?_id=${page.params.slug}`;
			// get request with _id of book as query param
			const res = await fetch(url);
			// If we got a response
			if (res.ok) {
				return {
					props: {
						book: await res.json()
					}
				} as LoadOutput;
			} else {
				return {
					status: res.status,
					error: new Error(`Could not load book w/ id ${page.params.slug}`)
				} as LoadOutput;
			}
		} catch (e) {
			console.log(e);
			return {
				status: 500,
				error: e
			} as LoadOutput;
		}
	};
</script>

<script lang="ts">
	import type { Book, Inquisitor } from '$lib/types';
	import { browser } from '$app/env';
	import { parser, purifySanitize } from '$lib/other';

	export let book: Book;

	interface GenBook {
		content: string;
		nextChapter: string;
		prevChapter: string;
	}

	const genBook: GenBook = {
		content: '',
		nextChapter: '',
		prevChapter: ''
	};

	$: update(book.url);

	function findInnerHTML(value: string, page: Document): string {
		// Search all nodes for text that contains value
		const iterator = page.evaluate(
			`//*[text()['${value}' = normalize-space()]]`,
			page,
			null,
			XPathResult.UNORDERED_NODE_ITERATOR_TYPE,
			null
		);
		const next = iterator.iterateNext() as HTMLElement;

		if (next) {
			let node: HTMLElement | null = next;
			do {
				if (node.hasAttribute('href')) {
					return (node as HTMLAnchorElement).href;
				}
				node = node.parentElement;
			} while (node != null);
		}
		return '';
	}

	function findSelector(value: string, page: Document): string {
		const el = page.querySelector(value);
		if (el) {
			return el.innerHTML;
		} else {
			return '';
		}
	}

	function matchValue(inquisitor: Inquisitor, page: Document): string {
		// first match selector
		switch (inquisitor.type) {
			case 'innerHTML': {
				// return findInnerHTML(inquisitor.value, page);
				return findInnerHTML(inquisitor.value, page);
			}
			case 'selector': {
				return findSelector(inquisitor.value, page);
			}
			default: {
				return '';
			}
		}
	}

	async function update(url: string) {
		try {
			if (browser) {
				// Fetch the url of the book
				const res = await fetch(`/books/curl?url=${url}`);

				if (!res.ok) {
					throw res.status;
				}

				const page = (await parser).parseFromString(await res.text(), 'text/html');

				genBook.content = (await purifySanitize)(matchValue(book.content, page));
				genBook.prevChapter = matchValue(book.prevChapter, page);
				genBook.nextChapter = matchValue(book.nextChapter, page);
			}
		} catch (e) {
			console.log(e);
		}
	}

	async function updateUrl() {
		// Move to top of page
		window.scrollTo(0, 0);
		// Send request to server
		await fetch('/user/book-individual', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				_id: book._id,
				newUrl: book.url
			})
		});
	}

	function updateNextChapter() {
		book.url = genBook.nextChapter;
		updateUrl();
	}

	function updatePrevChapter() {
		book.url = genBook.prevChapter;
		updateUrl();
	}
</script>

<div id="backdrop">
	<div id="content">
		<div id="book">
			{@html genBook.content}
		</div>
		<nav id="nav">
			{#if genBook.prevChapter}
				<button on:click={updatePrevChapter} id="prev_chapter">Prev</button>
			{/if}
			{#if genBook.nextChapter}
				<button on:click={updateNextChapter} id="next_chapter">Next</button>
			{/if}
		</nav>
	</div>
</div>

<style lang="scss">
	#backdrop {
		width: 100%;
		min-height: 100%;
		background-color: var(--backdrop);
	}
	#content {
		// Set content background
		background-color: var(--background-color);
		color: var(--foreground-color);

		padding: 1rem;

		margin: 0 auto;
	}
	#nav {
		text-align: center;
	}
	#prev_chapter,
	#next_chapter {
		// Button passives
		border: none;
		text-decoration: none;
		background: transparent;
		padding: 1rem 0.25rem;
		margin: 0;

		// Font
		font-size: 1rem;
		color: var(--foreground-color);
		text-decoration: underline;

		// Button actives
		&:hover {
			cursor: pointer;
		}
		&:active {
			color: var(--red);
		}
	}
	// Used media queries from https://getbootstrap.com/docs/3.4/css/
	$screen-sm-min: 768px;
	$screen-md-min: 992px;
	$screen-lg-min: 1200px;

	@media (min-width: $screen-sm-min) {
		#content {
			max-width: none;
		}
	}
	@media (min-width: $screen-md-min) {
		#content {
			max-width: 50%;
		}
	}
	@media (min-width: $screen-lg-min) {
		#content {
			max-width: 30%;
		}
	}
</style>
