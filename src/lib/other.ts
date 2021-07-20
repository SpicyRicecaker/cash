/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import type { sanitize } from 'dompurify';
import { browser } from '$app/env';

const config = {
    // Get rid of all buttons
    FORBID_TAGS: ['button'],
    // Then for all buttons, remove their content recursively
    KEEP_CONTENT: false
};

export const setup = {
    resParser: () => { },
    rejParser: () => { },
};

export const parser = new Promise<DOMParser>((resolve, reject) => {
    setup.resParser = () => {
        console.log('creating new parser');
        resolve(new DOMParser());
    };
});

export let purifySanitize = new Promise<typeof sanitize>((resolve, reject) => { });

if (browser) {
    (async () => {
        await setup.resParser();
        const v = await import('dompurify');
        v.default.setConfig(config);
        purifySanitize = Promise.resolve(v.default.sanitize);
    })();
}
