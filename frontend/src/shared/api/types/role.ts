export enum ENUM_POLICY_ACTION {
    MANAGE = 'manage',
    READ = 'read',
    CREATE = 'create',
    UPDATE = 'update',
    DELETE = 'delete',
    EXPORT = 'export',
    IMPORT = 'import',
}

export enum ENUM_POLICY_SUBJECT {
    ALL = 'ALL',
    API_KEY = 'API_KEY',
    SETTING = 'SETTING',
    ROLE = 'ROLE',
    USER = 'USER',
}

export enum ENUM_POLICY_ROLE_TYPE {
    SUPER_ADMIN = 'SUPER_ADMIN',
    ADMIN = 'ADMIN',
    USER = 'USER',
}

export interface IPermission {
    subject: ENUM_POLICY_SUBJECT;
    action: ENUM_POLICY_ACTION[];
}

export interface IRole {
    readonly name: string;
    readonly description?: string;
    readonly isActive: boolean;

    readonly type: ENUM_POLICY_ROLE_TYPE;
    readonly permissions: IPermission | [];

    readonly createdAt: Date;

    readonly updatedAt: Date;

    readonly deletedAt?: Date;
}
