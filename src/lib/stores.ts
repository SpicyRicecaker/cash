import { Book, readBookDefault, ReadBook } from '$lib/types';
import { bookDefault } from '$lib/types';

import type { Writable } from 'svelte/store';
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
            book = bookDefault();
            localStorage.setItem('selectedBook', JSON.stringify(book));
        }
    } else {
        book = bookDefault();
    }
    // && browser
    const { subscribe, set, update } = writable(book);

    return {
        subscribe,
        set: (value: Book) => {
            // Update local storage
            localStorage.setItem('selectedBook', JSON.stringify(value));
            set(value);
        },
        update
        // update: (updater: Updater<Book>) => { (value: Book) => { return updater(value) } },
    };
}

export const readBook: Writable<ReadBook> = writable(readBookDefault());
