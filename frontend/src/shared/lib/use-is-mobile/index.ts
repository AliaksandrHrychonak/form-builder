'use client';

import { useEffect, useState } from 'react';

import { Config } from '@shared/config';

const { UI_MOBILE_BREAKPOINT } = Config;

export const useIsMobile = (): boolean => {
    const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        const mql = window.matchMedia(`(max-width: ${UI_MOBILE_BREAKPOINT - 1}px)`);
        const onChange = (): void => {
            setIsMobile(window.innerWidth < UI_MOBILE_BREAKPOINT);
        };
        mql.addEventListener('change', onChange);
        setIsMobile(window.innerWidth < UI_MOBILE_BREAKPOINT);
        return (): void => mql.removeEventListener('change', onChange);
    }, []);

    return !!isMobile;
};
