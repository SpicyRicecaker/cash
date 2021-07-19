import type { Book } from '$lib/types';
import { newBook } from '$lib/types';

import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

export const selectedBook: Writable<Book> = writable(newBook());