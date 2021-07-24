/* eslint-disable @typescript-eslint/no-empty-function */
import type { sanitize } from 'dompurify';
import { browser } from '$app/env';

const config = {
    // Get rid of all buttons
    FORBID_TAGS: ['button'],
    // Then for all buttons, remove their content recursively
    KEEP_CONTENT: false
};

let resParser = () => { };

export const parser = new Promise<DOMParser>((resolve) => {
    resParser = () => {
        resolve(new DOMParser());
    };
});

export let purifySanitize = new Promise<typeof sanitize>(() => { });

if (browser) {
    (async () => {
        resParser();
        const v = await import('dompurify');
        v.default.setConfig(config);
        purifySanitize = Promise.resolve(v.default.sanitize);
    })();
}
