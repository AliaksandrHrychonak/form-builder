'use client';

import { signOut } from 'next-auth/react';

import type { SignOutParams, SignOutResponse } from 'next-auth/react';

export const logoutApi = async (data?: SignOutParams): Promise<SignOutResponse | undefined> => {
    return signOut(data);
};
