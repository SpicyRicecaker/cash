<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import type { Book } from './types';
	export let book: Book;

	const dispatch = createEventDispatcher<{ submit: Book; cancel: {} }>();

	function cancel() {
		dispatch('cancel');
	}

	$: invalid = someInvalid(booksValidator);
	const someInvalid = (booksValidator: boolean[]): boolean => booksValidator.some((v) => !v);

	const submit = () => (invalid ? {} : dispatch('submit', book));

	let booksValidator = [true, true, true];

	const handleTypeInputChange = (t: string, field: number) =>
		(booksValidator[field] = t === 'innerHTML' || t === 'selector');
</script>

<div id="form">
	<div id="items">
		<div>
			<label for="name">name:</label>
			<input placeholder="innerHTML | selector" bind:value={book.name} id="name" />
		</div>
		<div>
			<label for="url">url:</label>
			<input placeholder="e.g. mangadex.org" bind:value={book.url} id="url" />
		</div>

		<div>
			<label for="content-type">content type:</label>
			<input
				placeholder="innerHTML | selector"
				on:keyup={() => handleTypeInputChange(book.content.type, 0)}
				bind:value={book.content.type}
				class={booksValidator[0] ? 'valid' : 'invalid'}
				id="content-type"
			/>
		</div>

		<div>
			<label for="content-value">content value:</label>
			<input placeholder="e.g. .mt-5" bind:value={book.content.value} id="content-value" />
		</div>

		<div>
			<label for="prev-chapter-type">prev chapter type:</label>
			<input
				placeholder="innerHTML | selector"
				on:keyup={() => handleTypeInputChange(book.prevChapter.type, 1)}
				bind:value={book.prevChapter.type}
				class={booksValidator[1] ? 'valid' : 'invalid'}
				id="prev-chapter-type"
			/>
		</div>

		<div>
			<label for="prev-chapter-value">prev chapter value:</label>
			<input
				placeholder="e.g. prev chapter or .prev-chapter"
				bind:value={book.prevChapter.value}
				id="prev-chapter-value"
			/>
		</div>

		<div>
			<label for="next-chapter-type">next chapter type:</label>
			<input
				placeholder="innerHTML | selector"
				on:keyup={() => handleTypeInputChange(book.nextChapter.type, 2)}
				bind:value={book.nextChapter.type}
				class={booksValidator[2] ? 'valid' : 'invalid'}
				id="next-chapter-type"
			/>
		</div>

		<div>
			<label for="next-chapter-value">next chapter value:</label>
			<input
				placeholder="e.g. next chapter or .next-chapter"
				bind:value={book.nextChapter.value}
				id="next-chapter-value"
			/>
		</div>
	</div>
	<div id="submit">
		<button class={invalid ? 'invalid' : 'valid'} on:click={submit}>Submit</button>
	</div>

	<div class="del">
		<button id="cancel" on:click={cancel}>✕</button>
	</div>
</div>

<style lang="scss">
	button {
		border: none;
		text-decoration: none;
		padding: 1rem;
	}

	// Layout for the form
	#form {
		// Create popup over current page
		position: absolute;
		z-index: 1;
		width: 100%;
		height: 100vh;

		// Make it opaque
		// background-color: var(--background-color);
		background-color: var(--background-color);

		// List items in a grid
		display: flex;
		flex-direction: column;
	}

	#items {
		& > div {
			border-bottom: 0.08rem dashed var(--foreground-color);
			// Minimize the extra padding to each field

			// Center items
			justify-self: center;

			// For each form
			display: flex;

			padding: 0.5rem;

			// Set font size
			font-size: 2rem;
			& > label {
				opacity: 80%;
				align-self: baseline;
			}

			& > input {
				flex: 1;
				padding: none;
				margin: none;
				align-self: baseline;
				// display: inline-block;
				// _underlined works_
				border: none;
				// border-bottom: 2px solid var(--foreground-color);
				border-radius: 0%;
				outline: none;

				// Color same as normal text
				color: var(--foreground-color);
				// background-color: var(--background-color);
				background: transparent;
				font-size: 2rem;

				margin-left: 1rem;

				transition: 0.2s;
				// On focus
				&:focus {
					border-right: 2px solid var(--foreground-color);
					color: var(--yel);
				}
				&.valid {
					border-color: var(--grn);
				}
				&.invalid {
					border-color: var(--red);
					border-right: 2px solid var(--red);
				}
			}
		}
	}

	#submit {
		// display: flex;
		// gap: 1rem;
		text-align: center;
		& > button {
			padding: 0.5rem;

			flex: 0;
			&.valid {
				color: var(--grn);
			}
			&.invalid {
				color: var(--red);
				text-decoration: line-through;
				pointer-events: none;
			}
			// background-color: var(--background-color);
			background: transparent;
			font-size: 2rem;
			&:hover {
				cursor: pointer;
			}
		}
		& > div {
			flex: 1;
			// background-color: var(--foreground-color);
		}
		// gap: 1rem;
	}

	.del {
		margin: 0 auto;
		& > button#cancel {
			background-color: var(--background-color);
			color: var(--foreground-color);
			font-size: 2rem;
			line-height: 1.8rem;
			&:hover {
				cursor: pointer;
			}
		}
	}
</style>
