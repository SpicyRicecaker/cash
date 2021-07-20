<script lang="ts">
	import { selectedBook, readBook } from '$lib/stores';
	import type { Inquisitor, Book } from '$lib/types';
	// import type { DOMPurifyI } from 'dompurify';
	// import createDOMPurify from 'dompurify';
	// import { JSDOM } from 'jsdom';
	import { browser } from '$app/env';
	import { onMount } from 'svelte';

	let outsideResolve = function () {};
	let outsideReject = function () {};
	let parser = new Promise<DOMParser>((resolve, reject) => {
		outsideResolve = () => resolve(new DOMParser());
		outsideReject = () => resolve;
	});
	let dompurify = new Promise((resolve, reject) => {});

	onMount(async () => {
		if (browser) {
			await outsideResolve();
		}
		console.log($selectedBook.url);
		update($selectedBook.url);
	});

	// $: update($selectedBook.url);
	function findInnerHTML(value: string, page: Document): string {
		// Search all nodes for text that contains value
		let start = performance.now();
		const iterator = page.evaluate(
			`//*[text()['${value}' = normalize-space()]]`,
			page,
			null,
			XPathResult.UNORDERED_NODE_ITERATOR_TYPE,
			null
		);
		let next = iterator.iterateNext() as HTMLElement;
		console.log(`${performance.now() - start} ms`);
		console.log(next);

		// just turn leading spaces to zero lol
		start = performance.now();
		value.replace(/\s/g, '');
		const node = Array.from(page.body.querySelectorAll('*')).find(
			(el) => el.innerHTML.replace(/\s/g, '') === value
		);
		console.log(`${performance.now() - start} ms`);
		console.log(node);

		return '';
		if (next) {
			let parent;
			do {
				console.log(next);
				if (next.hasAttribute('href')) {
					return (next as HTMLAnchorElement).href;
				}
				parent = next.parentElement;
			} while (parent != null);
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
				const res = await fetch(url);

				if (!res.ok) {
					throw res.status;
				}

				const page = (await parser).parseFromString(await res.text(), 'text/html');

				$readBook.content = matchValue($selectedBook.content, page);
				$readBook.prevChapter = matchValue($selectedBook.prevChapter, page);
				$readBook.nextChapter = matchValue($selectedBook.nextChapter, page);
			}
		} catch (e) {
			console.log(e);
		}
	}
	$: {
		console.log($readBook);
	}
</script>

<p>TOODO</p>
<!-- every time that selected book.url changes.... Need to fetch {$selectedBook.url}, dom =
dom.parse(res) for [1, 2, 3] . match res.type select innerhtml map our returns onto interface book -->
<h3>{$readBook.content}</h3>
<h3>{$readBook.prevChapter}</h3>
<h3>{$readBook.nextChapter}</h3>
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
