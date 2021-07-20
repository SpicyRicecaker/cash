import { Book, newReadBook, ReadBook } from '$lib/types';
import { newBook } from '$lib/types';

import type { Writable, Updater } from 'svelte/store';
import { writable } from 'svelte/store';
import { browser } from '$app/env';

export const selectedBook: Writable<Book> = initSelectedBook();

function initSelectedBook(): Writable<Book> {
    let book: Book;
    if (browser) {
        const bookString: string | null = localStorage.getItem('selectedBook');
        if (bookString) {
            book = JSON.parse(bookString);
        } else {
            book = newBook();
            localStorage.setItem('selectedBook', JSON.stringify(book));
        }
    } else {
        book = newBook();
    }
    // && browser
    const { subscribe, set, update } = writable(book);

    return {
        subscribe,
        set: (value: Book) => { localStorage.setItem('selectedBook', JSON.stringify(value)); set(value) },
        update,
    };
}

export const readBook: Writable<ReadBook> = writable(newReadBook());