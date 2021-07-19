export interface Book {
    url: string;
    name: string;
    content: {
        type: string;
        value: string;
    };
    nextChapter: {
        type: string;
        value: string;
    };
    prevChapter: {
        type: string;
        value: string;
    };
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