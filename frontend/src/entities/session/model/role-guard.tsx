import { ENUM_POLICY_ROLE_TYPE } from '@shared/api';

import { useUserProfileQuery } from './use-user-profile-query';
import { hasPermissions, hasRequiredRole } from '../lib';

import type { IPermission, IRole } from '@shared/api';
import type { JSX, ReactNode } from 'react';

interface RoleGuardProps {
    allowedRoles?: IRole[];
    requiredPermissions?: IPermission[];
    children: ReactNode;
}

export const RoleGuard = ({
    allowedRoles = [],
    requiredPermissions = [],
    children,
}: RoleGuardProps): JSX.Element | null => {
    const { data: profile } = useUserProfileQuery();

    const role = profile?.data.role;

    if (!role) return null;

    if (role.type === ENUM_POLICY_ROLE_TYPE.SUPER_ADMIN) {
        return <>{children}</>;
    }

    const hasGuardRole = hasRequiredRole(role, allowedRoles);

    const hasGuardPermissions = hasPermissions(role, requiredPermissions);

    if (!hasGuardRole || !hasGuardPermissions) return null;

    return <>{children}</>;
};
