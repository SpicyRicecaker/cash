<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import type { Book } from './types';
	export let book: Book;

	const dispatch = createEventDispatcher<{ submit: Book; cancel: {} }>();

	function cancel() {
		dispatch('cancel');
	}

	const submit = () =>
		booksValidator.some((v) => !v) ? console.log('bad') : dispatch('submit', book);

	let booksValidator = [true, true, true];

	const handleTypeInputChange = (t: string, field: number) =>
		(booksValidator[field] = t === 'innerHTML' || t === 'selector');
</script>

<div id="form">
	<label for="name">name</label>
	<input bind:value={book.name} id="name" />

	<label for="url">name</label>
	<input bind:value={book.url} id="url" />

	<label for="content-type">content type</label>
	<input
		on:keyup={() => handleTypeInputChange(book.content.type, 0)}
		bind:value={book.content.type}
		class={booksValidator[0] ? 'valid' : 'invalid'}
		id="content-type"
	/>

	<label for="content-value">content value</label>
	<input bind:value={book.content.value} id="content-value" />

	<label for="prev-chapter-type">prev chapter type</label>
	<input
		on:keyup={() => handleTypeInputChange(book.prevChapter.type, 1)}
		bind:value={book.prevChapter.type}
		class={booksValidator[1] ? 'valid' : 'invalid'}
		id="prev-chapter-type"
	/>

	<label for="prev-chapter-value">prev chapter value</label>
	<input bind:value={book.prevChapter.value} id="prev-chapter-value" />

	<label for="next-chapter-type">next chapter type</label>
	<input
		on:keyup={() => handleTypeInputChange(book.nextChapter.type, 2)}
		bind:value={book.nextChapter.type}
		class={booksValidator[2] ? 'valid' : 'invalid'}
		id="next-chapter-type"
	/>

	<label for="next-chapter-value">next chapter value</label>
	<input bind:value={book.nextChapter.value} id="next-chapter-value" />

	<button on:click={cancel}>✕</button>
	<button on:click={submit}>Submit</button>
</div>

<style lang="scss">
	input {
		outline: none;
		border: 0.1rem solid gainsboro;
		padding: 1rem;
		border-radius: 2rem;
		color: var(--foreground-color);
		background-color: var(--background-color);
		transition: 0.2s;
		border: 0.1rem solid gray;
		/* border: 2px inset; */
		&:focus {
			border: 0.1rem solid #ababab;
			box-shadow: 0 0 0.2rem gray;
		}
		&.valid {
			border-color: var(--grn);
		}
		&.invalid {
			border-color: var(--red);
		}
	}

	button {
		border: none;
		text-decoration: none;
		padding: 1rem;
		color: var(--background-color);
		background-color: var(--foreground-color);
	}

	#form {
		position: absolute;
		z-index: 150;
		background-color: var(--background-color);
		width: 100%;
		height: 100%;
	}
</style>
