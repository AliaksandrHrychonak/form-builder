import type { IViewer } from './viewer';

export interface IParticipantUser extends IViewer {
    role: 'creator' | 'admin';
}

export interface IPresentationChangelog {
    user: IParticipantUser;
    message: string;
    createdAt: Date;
    id: string;
}

export interface IPresentationSlide {
    id: string;
    order: number;
    content: string;
}

export interface IPresentation {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    owner: IViewer;
    slides: IPresentationSlide[];
    participants: IParticipantUser[];
    changelogs: IPresentationChangelog[];
}
