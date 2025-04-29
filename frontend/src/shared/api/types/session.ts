import type { ENUM_POLICY_ROLE_TYPE } from '@shared/api';

export interface ISession {
    // TODO tokenType need enum
    tokenType: string;
    roleType: ENUM_POLICY_ROLE_TYPE;
    expiresIn: number;
    accessToken: string;
    refreshToken: string;
}

export interface IAuthResponse extends ISession {
    id: string;
    email: string;
}

export enum CredentialsNames {}
