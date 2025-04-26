import type { IPhoto } from './file';
import type { IRole } from '@shared/api/types/role';

export interface IViewer {
    readonly _id: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly mobileNumber?: string;
    readonly email: string;
    readonly role: IRole;
    readonly passwordExpired: Date;
    readonly passwordCreated: Date;
    readonly passwordAttempt: number;
    readonly signUpDate: Date;
    readonly signUpFrom: string;
    readonly status: string;
    readonly blocked: boolean;
    readonly photo?: IPhoto;
    readonly address?: string;
    readonly gender?: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly deletedAt?: Date;
}

export interface IViewerProfile extends Omit<IViewer, 'deletedAt'> {}

export interface IViewerCreateRequest {
    id: string;
}
