import { Book, readBookDefault, ReadBook, bookDefault } from '$lib/types';
import type { WritableBooks, PushFunction, DelFunction, ModifyFunction } from '$lib/types';

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

export const books: WritableBooks<Book[]> = initBooks();

function initBooks(): WritableBooks<Book[]> {
    const books: Book[] = [];
    const { subscribe, set, update } = writable(books);

    const push: PushFunction = async (): Promise<void> => {
        // Have to request a new book
        const res = await fetch('/user/books', { method: 'PUT' })
        const book = await res.json();
        // Insert this book in
        update((books: Book[]) => [...books, book]);
    };

    const del: DelFunction = async (i: number, _id: number): Promise<void> => {
        // Have to delete book
        const res = await fetch('/user/books', { method: 'DELETE', body: JSON.stringify(_id) })
        update((books: Book[]) => [...books.slice(0, i), ...books.slice(i + 1)]);
    }

    // const modify: ModifyFunction = async (i: number, key: string, value: string): Promise<void> => {

    // }

    return {
        subscribe,
        set,
        update,
        push,
        del,
        modify,
        // push: (),
        // pop: 
        // update: (updater: Updater<Book>) => {
        //     async (value: Book) => {
        //         await fetch('/user/books/', {
        //             method: 'POST',
        //             headers: { 'Content-Type': 'application/json' },
        //             body: JSON.stringify(value)
        //         });
        //         return updater(value)
        //     }
        // },
    }
}