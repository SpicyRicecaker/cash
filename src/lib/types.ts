import type { Writable } from 'svelte/store';

export interface Inquisitor {
    _id: string;
    type: string,
    value: string
}

export interface Book {
    _id: string;
    url: string;
    name: string;
    content: Inquisitor
    nextChapter: Inquisitor
    prevChapter: Inquisitor
}

export interface ReadBook {
    content: string;
    prevChapter: string;
    nextChapter: string;
}

export const readBookDefault = (): ReadBook => ({
    content: '',
    prevChapter: '',
    nextChapter: ''
})

export interface Theme {
    name: string;
    blk: string;
    red: string;
    grn: string;
    yel: string;
    blu: string;
    mag: string;
    cya: string;
    wht: string;
    foregroundColor: string;
    backgroundColor: string;
    backdrop: string;
}
export interface PushFunction {
    (book: Book): void;
}

export interface DelFunction {
    (): void;
}

export interface ModifyFunction {
    (i: number, key: string, value: string): void;
}
export interface WritableBooks<T> extends Writable<T> {
    push: PushFunction
    del: DelFunction
    modify: ModifyFunction
}