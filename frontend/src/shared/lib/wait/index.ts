import { Config } from '@shared/config';

const { DEFAULT_DELAY } = Config;

export const wait = async (ms = DEFAULT_DELAY): Promise<unknown> =>
    new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
