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
	<div class="del">
		<button id="cancel" on:click={cancel}>✕</button>
	</div>
	<div>
		<label for="name">name</label>
		<input bind:value={book.name} id="name" />
	</div>
	<div>
		<label for="url">url</label>
		<input bind:value={book.url} id="url" />
	</div>

	<div>
		<label for="content-type">content type</label>
		<input
			on:keyup={() => handleTypeInputChange(book.content.type, 0)}
			bind:value={book.content.type}
			class={booksValidator[0] ? 'valid' : 'invalid'}
			id="content-type"
		/>
	</div>

	<div>
		<label for="content-value">content value</label>
		<input bind:value={book.content.value} id="content-value" />
	</div>

	<div>
		<label for="prev-chapter-type">prev chapter type</label>
		<input
			on:keyup={() => handleTypeInputChange(book.prevChapter.type, 1)}
			bind:value={book.prevChapter.type}
			class={booksValidator[1] ? 'valid' : 'invalid'}
			id="prev-chapter-type"
		/>
	</div>

	<div>
		<label for="prev-chapter-value">prev chapter value</label>
		<input bind:value={book.prevChapter.value} id="prev-chapter-value" />
	</div>

	<div>
		<label for="next-chapter-type">next chapter type</label>
		<input
			on:keyup={() => handleTypeInputChange(book.nextChapter.type, 2)}
			bind:value={book.nextChapter.type}
			class={booksValidator[2] ? 'valid' : 'invalid'}
			id="next-chapter-type"
		/>
	</div>

	<div>
		<label for="next-chapter-value">next chapter value</label>
		<input bind:value={book.nextChapter.value} id="next-chapter-value" />
	</div>

	<div id="submit">
		<button on:click={submit}>Submit</button>
		<div>&nbsp;</div>
	</div>
</div>

<style lang="scss">
	button {
		border: none;
		text-decoration: none;
		padding: 1rem;
		// color: var(--background-color);
		// background-color: var(--foreground-color);
	}
	.del {
		position: absolute;
		top: 0;
		right: 0;
		& > button#cancel {
			background-color: var(--background-color);
			color: var(--foreground-color);
			font-size: 3rem;
			line-height: 1.8rem;
		}
	}
	#submit {
		display: flex;
		gap: 1rem;
		& > button {
			flex: 0;
			color: var(--background-color);
			background-color: var(--foreground-color);
			font-size: 1.5rem;
		}
		& > div {
			flex: 1;
			background-color: var(--foreground-color);
		}
		gap: 1re;
	}
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

	#form {
		position: absolute;
		z-index: 1;
		background-color: var(--background-color);
		width: 100%;
		height: 100%;
	}
</style>
