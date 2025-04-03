import * as ms from 'ms';

export const seconds = (value: string): number => {
    return ms(value as ms.StringValue) / 1000;
};
