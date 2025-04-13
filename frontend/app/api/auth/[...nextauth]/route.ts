import nextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import { refreshAccessToken } from '@entities/session';
import { login } from '@features/session';
import { googleSignin } from '@features/session/by-google';

import type { ISession } from '@shared/api';
import type { User } from 'next-auth';

const handler = nextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials): Promise<(User & ISession) | null> {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                try {
                    const { data: authData } = await login(credentials);

                    return {
                        id: credentials.email,
                        ...authData,
                    };
                } catch (error) {
                    throw error;
                }
            },
        }),
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
    ],
    callbacks: {
        async signIn({ account }) {
            if (account?.provider === 'google') {
                try {
                    await googleSignin(account.id_token as string);
                    return true;
                } catch (error) {
                    console.error(error);
                    return false;
                }
            }
            return true;
        },

        async jwt({ token, user, account }) {
            if (account && user) {
                return {
                    ...token,
                    accessToken: user.accessToken,
                    refreshToken: user.refreshToken,
                    expiresAt: Date.now() + user.expiresIn,
                    roleType: user.roleType,
                    tokenType: user.tokenType,
                };
            }

            if (token.expiresAt && typeof token.expiresAt === 'number' && Date.now() < token.expiresAt) {
                return token;
            }

            try {
                const { data: refreshedSession } = await refreshAccessToken(token.refreshToken as string);

                return {
                    ...token,
                    accessToken: refreshedSession.accessToken,
                    refreshToken: refreshedSession.refreshToken ?? token.refreshToken,
                    roleType: refreshedSession.roleType,
                    expiresAt: Date.now() + refreshedSession.expiresIn,
                    tokenType: refreshedSession.tokenType,
                };
            } catch (error) {
                return {
                    ...token,
                    error: error,
                };
            }
        },

        async session({ session, token }) {
            return {
                ...session,
                tokenType: token.tokenType,
                roleType: token.roleType,
                accessToken: token.accessToken,
                error: token.error,
                userRole: token.userRole,
                expires: new Date(token.expiresAt as number).toISOString(),
            };
        },
    },

    pages: {
        signIn: '/auth/signin',
        // signOut: '/auth/signout',
        error: '/auth/error',
        // verifyRequest: '/auth/verify-request',
    },

    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60,
    },

    debug: process.env.NODE_ENV === 'development',
});

export { handler as GET, handler as POST };
