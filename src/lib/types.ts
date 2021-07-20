export interface Inquisitor {
    type: string,
    value: string
}

export interface Book {
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

export const newBook = (): Book => (
    {
        url: '',
        name: '',
        content: {
            type: '',
            value: ''
        },
        nextChapter: {
            type: '',
            value: ''
        },
        prevChapter: {
            type: '',
            value: ''
        }
    }
)

export const newReadBook = (): ReadBook => ({
    content: '',
    prevChapter: '',
    nextChapter: ''
})