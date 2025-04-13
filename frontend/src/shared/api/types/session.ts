import type { ENUM_POLICY_ROLE_TYPE } from '@shared/api';

export interface ISession {
    // tokenType: 'Bearer';
    tokenType: string;
    roleType: ENUM_POLICY_ROLE_TYPE;
    expiresIn: number;
    accessToken: string;
    refreshToken: string;
}

export enum CredentialsNames {}
