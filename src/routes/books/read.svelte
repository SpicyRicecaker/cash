<script context="module" lang="ts">
</script>

<script lang="ts">
	import { selectedBook, readBook } from '$lib/stores';
	import type { Inquisitor } from '$lib/types';
	import { browser } from '$app/env';
	import { parser, purifySanitize } from '$lib/other';

	$: update($selectedBook.url);
	function findInnerHTMLQuery(value: string, page: Document): string {
		const next = Array.from(page.body.querySelectorAll('*')).find(
			(el) => el.innerHTML.replace(/\s+/g, ' ') === value
		);
		if (next) {
			let node: HTMLElement | null = next as HTMLElement;
			do {
				if (node.hasAttribute('href')) {
					return (node as HTMLAnchorElement).href;
				}
				node = node.parentElement;
			} while (node != null);
		}
		return '';
	}

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
				return findInnerHTMLQuery(inquisitor.value, page);
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
				const res = await fetch(`/books/api?url=${$selectedBook.url}`);

				if (!res.ok) {
					throw res.status;
				}

				const page = (await parser).parseFromString(await res.text(), 'text/html');

				$readBook.content = (await purifySanitize)(matchValue($selectedBook.content, page));
				$readBook.prevChapter = matchValue($selectedBook.prevChapter, page);
				$readBook.nextChapter = matchValue($selectedBook.nextChapter, page);
				console.log($readBook.prevChapter);
				console.log($readBook.nextChapter);
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
				name: $selectedBook.name,
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
<style lang="scss">
	span {
		cursor: pointer;
		color: blue;
		text-decoration: underline;
	}
</style>
