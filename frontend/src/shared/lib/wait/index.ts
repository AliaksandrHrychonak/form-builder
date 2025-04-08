export const wait = async (ms = 500): Promise<unknown> =>
    new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
