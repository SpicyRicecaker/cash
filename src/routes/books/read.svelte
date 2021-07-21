<script context="module" lang="ts">
</script>

<script lang="ts">
	import { selectedBook, readBook } from '$lib/stores';
	import type { Inquisitor } from '$lib/types';
	import { browser } from '$app/env';
	import { parser, purifySanitize } from '$lib/other';

	$: update($selectedBook.url);
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
				// Fetch
				const res = await fetch(`/books/api?url=${url}`);

				if (!res.ok) {
					throw res.status;
				}

				const page = (await parser).parseFromString(await res.text(), 'text/html');

				$readBook.content = (await purifySanitize)(matchValue($selectedBook.content, page));
				$readBook.prevChapter = matchValue($selectedBook.prevChapter, page);
				$readBook.nextChapter = matchValue($selectedBook.nextChapter, page);
			}
		} catch (e) {
			console.log(e);
		}
	}

	async function updateUrl() {
		// Send request to server
		await fetch('/user/book-individual', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				_id: $selectedBook._id,
				newUrl: $selectedBook.url
			})
		});
	}

	function updateNextChapter() {
		$selectedBook.url = $readBook.nextChapter;
		updateUrl();
	}

	function updatePrevChapter() {
		$selectedBook.url = $readBook.prevChapter;
		updateUrl();
	}
</script>

<div id="content">
	<div id="book">
		{@html $readBook.content}
	</div>
	<nav id="nav">
		{#if $readBook.prevChapter}
			<span on:click={updatePrevChapter} id="prev_chapter">Prev</span>
		{/if}
		{#if $readBook.nextChapter}
			<span on:click={updateNextChapter} id="next_chapter">Next</span>
		{/if}
	</nav>
</div>

<style lang="scss">
	#content {
		background-color: var(--background-color);
		color: var(--foreground-color);
		a {
			color: var(--foreground-color);
			&:active {
				color: var(--red);
			}
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
	// span {
	// 	cursor: pointer;
	// 	color: blue;
	// 	text-decoration: underline;
	// }
</style>
