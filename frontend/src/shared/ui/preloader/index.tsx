import { LoaderCircle } from 'lucide-react';

import type { JSX } from 'react';

export const Preloader = (): JSX.Element => {
    return <LoaderCircle className='animate-spin size-12 m-auto' />;
};
