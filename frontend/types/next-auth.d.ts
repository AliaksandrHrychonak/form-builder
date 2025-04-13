import type { ENUM_POLICY_ROLE_TYPE } from '@shared/api';
import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
    interface Session {
        tokenType: string;
        roleType: ENUM_POLICY_ROLE_TYPE;
        expiresIn: number;
        accessToken: string;
        refreshToken: string;
        user: {} & DefaultSession['user'];
    }

    interface User {
        tokenType: string;
        roleType: ENUM_POLICY_ROLE_TYPE;
        expiresIn: number;
        accessToken: string;
        refreshToken: string;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        tokenType: string;
        roleType: ENUM_POLICY_ROLE_TYPE;
        expiresIn: number;
        accessToken: string;
        refreshToken: string;
    }
}
