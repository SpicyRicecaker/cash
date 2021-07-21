export interface Inquisitor {
    _id: string;
    type: string,
    value: string
}

const inquisitorDefault = (): Inquisitor => ({ _id: '', type: '', value: '' })

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

export const bookDefault = (): Book => (
    {
        _id: '',
        url: '',
        name: '',
        content: inquisitorDefault(),
        nextChapter: inquisitorDefault(),
        prevChapter: inquisitorDefault()
    }
)

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
}