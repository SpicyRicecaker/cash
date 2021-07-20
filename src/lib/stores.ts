import { Book, newReadBook, ReadBook } from '$lib/types';
import { newBook } from '$lib/types';

import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

export const selectedBook: Writable<Book> = writable(newBook());
export const readBook: Writable<ReadBook> = writable(newReadBookTest());

function newReadBookTest() {
    console.log('generating new book');
    return newReadBook()
}