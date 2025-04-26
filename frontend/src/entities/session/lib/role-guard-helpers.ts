import type { IPermission, IRole } from '@shared/api';

const hasRequiredRole = (role: IRole, allowedRoles: IRole[]): boolean => {
    if (allowedRoles.length === 0) return true;
    return allowedRoles.some((allowedRole) => allowedRole.isActive && allowedRole.type === role.type);
};

const hasRequiredSubject = (userPerm: IPermission, permission: IPermission): boolean =>
    userPerm.subject === permission.subject;

const hasRequiredActions = (userPerm: IPermission, permission: IPermission): boolean => {
    if (!Array.isArray(permission.action) || !Array.isArray(userPerm.action)) {
        return false;
    }
    return permission.action.every((action) => userPerm.action.includes(action));
};

const hasRequiredPermission = (userPerms: IPermission[], permission: IPermission): boolean =>
    userPerms.some((userPerm) => hasRequiredSubject(userPerm, permission) && hasRequiredActions(userPerm, permission));

const hasPermissions = (role: IRole, requiredPermissions: IPermission[]): boolean => {
    if (requiredPermissions.length === 0) return true;
    const permissions = role.permissions as IPermission[];

    if (!Array.isArray(permissions)) return false;

    return requiredPermissions.every((permission) => hasRequiredPermission(permissions, permission));
};

export { hasRequiredRole, hasPermissions };
