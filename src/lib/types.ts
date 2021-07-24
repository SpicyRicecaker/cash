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