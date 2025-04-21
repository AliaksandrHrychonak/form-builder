import { TemplateCreateRequestDto } from '../dtos/request/template.create.request.dto';
import {
    IDatabaseCreateOptions,
    IDatabaseExistOptions,
    IDatabaseFindAllOptions,
    IDatabaseFindOneOptions,
    IDatabaseGetTotalOptions,
    IDatabaseManyOptions,
    IDatabaseSaveOptions,
} from '../../../common/database/interfaces/database.interface';
import {
    TemplateDoc,
    TemplateEntity,
} from '../repository/entities/template.entity';
import { ClientSession } from 'mongoose';
import { ITemplateDoc } from './template.interface';
import { TemplateGetResponseDto } from '../dtos/response/template.get.response.dto';
import { TemplateListResponseDto } from '../dtos/response/template.list.response.dto';

export interface ITemplateService {
    create(
        {
            title,
            description,
            isPublic,
            forms,
            owner,
            questions,
            sharedUsers,
            tags,
            topic,
        }: TemplateCreateRequestDto,
        options?: IDatabaseCreateOptions
    ): Promise<TemplateDoc>;
    findAll(
        find?: Record<string, any>,
        options?: IDatabaseFindAllOptions
    ): Promise<TemplateDoc[]>;
    mapList(template: TemplateDoc[]): Promise<TemplateListResponseDto[]>;
    getTotal(
        find?: Record<string, any>,
        options?: IDatabaseGetTotalOptions
    ): Promise<number>;
    findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<TemplateDoc>;
    existsByIds(
        ids: string[],
        options?: IDatabaseExistOptions<ClientSession>
    ): Promise<boolean>;
    mapGetTemplate(template: ITemplateDoc): Promise<TemplateGetResponseDto>;
    populateUsers(repository: TemplateDoc): Promise<TemplateDoc>;
    populateTemplateDetails(repository: TemplateDoc): Promise<TemplateDoc>;
    populateExtraDetails(repository: TemplateDoc): Promise<TemplateDoc>;
    joinWithRelations(repository: TemplateDoc): Promise<ITemplateDoc>;
    private(
        repository: TemplateDoc,
        options?: IDatabaseSaveOptions
    ): Promise<TemplateEntity>;
    privateMany(
        ids: string[],
        owners: string[],
        options?: IDatabaseSaveOptions
    ): Promise<boolean>;
    public(
        repository: TemplateDoc,
        options?: IDatabaseSaveOptions
    ): Promise<TemplateEntity>;
    publicMany(
        ids: string[],
        owners: string[],
        options?: IDatabaseSaveOptions
    ): Promise<boolean>;
    selfDelete(
        repository: TemplateDoc,
        options?: IDatabaseSaveOptions
    ): Promise<TemplateDoc>;
    selfDeleteMany(
        ids: string[],
        owners: string[],
        options?: IDatabaseManyOptions
    ): Promise<boolean>;
    shared(
        repository: TemplateDoc,
        sharedUsers: string[],
        options?: IDatabaseSaveOptions
    ): Promise<TemplateEntity>;
    sharedMany(
        ids: string[],
        owners: string[],
        sharedUsers: string[],
        options?: IDatabaseSaveOptions
    ): Promise<boolean>;
}
