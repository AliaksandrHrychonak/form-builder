import chroma from 'chroma-js';

export const getLuminanceColor = (bgColor: string): string => {
    try {
        const color = chroma(bgColor);
        return color.luminance() > 0.5 ? 'black' : 'white';
    } catch {
        return 'black';
    }
};
