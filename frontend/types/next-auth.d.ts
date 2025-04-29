import type { ENUM_POLICY_ROLE_TYPE } from '@shared/api';

interface ExtendedUser extends DefaultUser {
    accessToken?: string;
    refreshToken?: string;
    roleType?: string;
    tokenType?: string;
    expiresIn?: number;
}

declare module 'next-auth' {
    interface Session {
        accessToken?: string;
        refreshToken?: string;
        roleType?: ENUM_POLICY_ROLE_TYPE;
        expires: string;
        tokenType?: string;
        user?: {
            email?: string | null;
        };
    }

    interface JWT {
        accessToken?: string;
        refreshToken?: string;
        roleType?: ENUM_POLICY_ROLE_TYPE;
        expiresAt?: number;
        tokenType?: string;
    }

    interface User extends ExtendedUser {}
}
