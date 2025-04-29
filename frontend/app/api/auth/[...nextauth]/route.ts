import nextAuth from 'next-auth/next';
import AppleProvider from 'next-auth/providers/apple';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import { refreshTokenApi } from '@entities/session';
import { loginWithAppleApi, loginWithCredentialsApi, loginWithGoogleApi } from '@features/session';

import type { LoginFormData } from '@features/session';
import type { ENUM_POLICY_ROLE_TYPE, IErrorException, ISession } from '@shared/api';
import type { AxiosError } from 'axios';
import type { User } from 'next-auth';
import type { JWT } from 'next-auth/jwt';


export interface ExtendedUser extends User {
    accessToken: string;
    refreshToken: string;
    roleType: ENUM_POLICY_ROLE_TYPE;
    expiresIn: number;
    tokenType: string;
}

const updateTokenWithAuthData = (token: JWT, authData: ISession): JWT => {
    return {
        ...token,
        accessToken: authData.accessToken,
        refreshToken: authData.refreshToken,
        roleType: authData.roleType,
        tokenType: authData.tokenType,
        expiresAt: Date.now() + authData.expiresIn,
    };
};

const handler = nextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code',
                },
            },
        }),
        AppleProvider({
            clientId: process.env.APPLE_CLIENT_ID as string,
            clientSecret: process.env.APPLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                email: { type: 'text' },
                password: { type: 'password' },
            },
            async authorize(credentials): Promise<ExtendedUser | null> {
                try {
                    if (!credentials?.email || !credentials?.password) {
                        return null;
                    }

                    const loginData: LoginFormData = {
                        email: credentials.email,
                        password: credentials.password,
                    };

                    const { data: authData } = await loginWithCredentialsApi(loginData);
                    return {
                        id: credentials.email,
                        email: credentials.email,
                        accessToken: authData.accessToken,
                        refreshToken: authData.refreshToken,
                        roleType: authData.roleType,
                        expiresIn: authData.expiresIn,
                        tokenType: authData.tokenType,
                    } as ExtendedUser;
                } catch (error) {
                    const axiosError = error as AxiosError<IErrorException>;
                    if (axiosError && axiosError.response?.data) {
                        const axiosErrorData = axiosError.response.data;

                        throw new Error(JSON.stringify(axiosErrorData));
                    }

                    throw new Error('Unknown auth error');
                }
            },
        }),
    ],
    callbacks: {
        async signIn({ account, user }) {
            if (account?.provider === 'google') {
                try {
                    const { data: authData } = await loginWithGoogleApi(account.id_token);
                    user.accessToken = authData.accessToken;
                    user.refreshToken = authData.refreshToken;
                    user.expiresIn = authData.expiresIn;
                    user.tokenType = authData.tokenType;
                    user.roleType = authData.roleType;

                    return true;
                } catch (error) {
                    const axiosError = error as AxiosError<IErrorException>;
                    if (axiosError && axiosError.response?.data) {
                        const axiosErrorData = axiosError.response.data;

                        throw new Error(JSON.stringify(axiosErrorData));
                    }

                    throw new Error('Unknown auth error');
                }
            }

            if (account?.provider === 'apple') {
                try {
                    const { data: authData } = await loginWithAppleApi(account.id_token);

                    user.accessToken = authData.accessToken;
                    user.refreshToken = authData.refreshToken;
                    user.expiresIn = authData.expiresIn;
                    user.tokenType = authData.tokenType;
                    user.roleType = authData.roleType;

                    return true;
                } catch (error) {
                    const axiosError = error as AxiosError<IErrorException>;
                    if (axiosError && axiosError.response?.data) {
                        const axiosErrorData = axiosError.response.data;

                        throw new Error(JSON.stringify(axiosErrorData));
                    }

                    throw new Error('Unknown auth error');
                }
            }

            return true;
        },
        async jwt({ token, user, trigger }) {
            if (user && (trigger === 'signIn' || trigger === 'update')) {
                const extendedUser = user as ExtendedUser;
                return updateTokenWithAuthData(token, {
                    accessToken: extendedUser.accessToken,
                    refreshToken: extendedUser.refreshToken,
                    roleType: extendedUser.roleType,
                    tokenType: extendedUser.tokenType,
                    expiresIn: extendedUser.expiresIn,
                });
            }

            if (token.expiresAt && typeof token.expiresAt === 'number') {
                if (Date.now() + 10000 >= token.expiresAt) {
                    try {
                        const { data: refreshedSession } = await refreshTokenApi(token.refreshToken as string);
                        return updateTokenWithAuthData(token, refreshedSession);
                    } catch (error) {
                        const axiosError = error as AxiosError<IErrorException>;
                        if (axiosError && axiosError.response?.data) {
                            const axiosErrorData = axiosError.response.data;

                            throw new Error(JSON.stringify(axiosErrorData));
                        }

                        throw new Error('Unknown auth error');
                    }
                }
            }

            return token;
        },

        async session({ session, token }) {
            return {
                ...session,
                accessToken: token.accessToken,
                refreshToken: token.refreshToken,
                roleType: token.roleType,
                tokenType: token.tokenType,
                expires: token.expiresAt ? new Date(token.expiresAt as number).toISOString() : session.expires,
            };
        },
    },
    pages: {
        signIn: '/auth/signin',
    },

    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60,
    },

    debug: process.env.NODE_ENV === 'development',
});

export { handler as GET, handler as POST };
