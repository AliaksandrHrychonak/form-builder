import { Injectable } from '@nestjs/common';
import { ITemplateService } from 'src/modules/template/interfaces/template.service.interface';
import {
    IDatabaseCreateOptions,
    IDatabaseExistOptions,
    IDatabaseFindAllOptions,
    IDatabaseFindOneOptions,
    IDatabaseGetTotalOptions,
    IDatabaseManyOptions,
    IDatabaseSaveOptions,
} from 'src/common/database/interfaces/database.interface';
import { ConfigService } from '@nestjs/config';
import { TemplateRepository } from 'src/modules/template/repository/repositories/template.repository';
import { TemplateCreateRequestDto } from 'src/modules/template/dtos/request/template.create.request.dto';
import {
    TemplateDoc,
    TemplateEntity,
} from 'src/modules/template/repository/entities/template.entity';
import { ClientSession } from 'mongoose';
import { TemplateQuestionEntity } from '../repository/entities/template-question.entity';
import { TemplateFormEntity } from '../repository/entities/template-form.entity';
import { TemplateCommentEntity } from '../repository/entities/template-comment.entity';
import { TemplateLikeEntity } from '../repository/entities/template-like.entity';
import { TemplateTagEntity } from '../repository/entities/template-tag.entity';
import { plainToInstance } from 'class-transformer';
import { ITemplateDoc } from '../interfaces/template.interface';
import { TemplateGetResponseDto } from '../dtos/response/template.get.response.dto';
import { TemplateListResponseDto } from '../dtos/response/template.list.response.dto';
import { TemplateUpdateRequestDto } from '../dtos/request/template.update.request.dto';
import { UserEntity } from '../../user/repository/entities/user.entity';

@Injectable()
export class TemplateService implements ITemplateService {
    private readonly uploadPath: string;

    constructor(
        private readonly templateRepository: TemplateRepository,
        private readonly configService: ConfigService
    ) {
        this.uploadPath = this.configService.get<string>('template.uploadPath');
    }

    async findAll(
        find?: Record<string, any>,
        options?: IDatabaseFindAllOptions
    ): Promise<TemplateDoc[]> {
        return this.templateRepository.findAll<TemplateDoc>(find, options);
    }

    async getTotal(
        find?: Record<string, any>,
        options?: IDatabaseGetTotalOptions
    ): Promise<number> {
        return this.templateRepository.getTotal(find, options);
    }

    async mapList(template: TemplateDoc[]): Promise<TemplateListResponseDto[]> {
        return plainToInstance(
            TemplateListResponseDto,
            template.map(u => u.toObject())
        );
    }

    async create(
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
    ): Promise<TemplateDoc> {
        const create: TemplateEntity = new TemplateEntity();
        create.title = title;
        create.description = description;
        create.isPublic = isPublic;
        create.forms = forms;
        create.owner = owner;
        create.questions = questions;
        create.sharedUsers = sharedUsers;
        create.tags = tags;
        create.topic = topic;

        return this.templateRepository.create<TemplateEntity>(create, options);
    }

    async findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<TemplateDoc> {
        return this.templateRepository.findOneById<TemplateDoc>(_id, options);
    }

    async existsByIds(
        ids: string[],
        options?: IDatabaseExistOptions<ClientSession>
    ): Promise<boolean> {
        return this.templateRepository.exists({
            _id: { $in: ids },
        });
    }

    async populateUsers(repository: TemplateDoc): Promise<TemplateDoc> {
        return repository.populate([
            {
                path: 'owner',
                localField: 'owner',
                foreignField: '_id',
                model: UserEntity.name,
            },
            {
                path: 'sharedUsers',
                localField: 'sharedUsers',
                foreignField: '_id',
                model: UserEntity.name,
            },
        ]);
    }

    async populateTemplateDetails(
        repository: TemplateDoc
    ): Promise<TemplateDoc> {
        return repository.populate([
            {
                path: 'questions',
                localField: 'questions',
                foreignField: '_id',
                model: TemplateQuestionEntity.name,
            },
            {
                path: 'forms',
                localField: 'forms',
                foreignField: '_id',
                model: TemplateFormEntity.name,
            },
        ]);
    }

    async populateExtraDetails(repository: TemplateDoc): Promise<TemplateDoc> {
        return repository.populate([
            {
                path: 'comments',
                localField: 'comments',
                foreignField: '_id',
                model: TemplateCommentEntity.name,
            },
            {
                path: 'likes',
                localField: 'likes',
                foreignField: '_id',
                model: TemplateLikeEntity.name,
            },
            {
                path: 'tags',
                localField: 'tags',
                foreignField: '_id',
                model: TemplateTagEntity.name,
            },
        ]);
    }

    async joinWithRelations(repository: TemplateDoc): Promise<ITemplateDoc> {
        return repository.populate([
            {
                path: 'owner',
                localField: 'owner',
                foreignField: '_id',
                model: UserEntity.name,
            },
            {
                path: 'tags',
                localField: 'tags',
                foreignField: '_id',
                model: TemplateTagEntity.name,
            },
        ]);
    }

    async mapGetTemplate(
        template: ITemplateDoc
    ): Promise<TemplateGetResponseDto> {
        return plainToInstance(TemplateGetResponseDto, template.toObject());
    }

    async update(
        repository: TemplateDoc,
        {
            title,
            description,
            isPublic,
            forms,
            questions,
            sharedUsers,
            tags,
            topic,
        }: TemplateUpdateRequestDto,
        options?: IDatabaseSaveOptions
    ): Promise<TemplateDoc> {
        repository.title = title;
        repository.description = description;
        repository.isPublic = isPublic;
        repository.forms = forms;
        repository.questions = questions;
        repository.sharedUsers = sharedUsers;
        repository.tags = tags;
        repository.topic = topic;

        return this.templateRepository.save(repository, options);
    }

    async public(
        repository: TemplateDoc,
        options?: IDatabaseSaveOptions
    ): Promise<TemplateEntity> {
        repository.isPublic = true;

        return this.templateRepository.save(repository, options);
    }

    async publicMany(
        ids: string[],
        owners: string[],
        options?: IDatabaseSaveOptions
    ): Promise<boolean> {
        const findCriteria = {
            owner: { $in: owners },
            _id: { $in: ids },
        };

        const data = { isPublic: true };

        return this.templateRepository.updateMany(findCriteria, data, options);
    }

    async private(
        repository: TemplateDoc,
        options?: IDatabaseSaveOptions
    ): Promise<TemplateEntity> {
        repository.isPublic = false;

        return this.templateRepository.save(repository, options);
    }

    async privateMany(
        ids: string[],
        owners: string[],
        options?: IDatabaseSaveOptions
    ): Promise<boolean> {
        const findCriteria = {
            owner: { $in: owners },
            _id: { $in: ids },
        };

        const data = { isPublic: false };

        return this.templateRepository.updateMany(findCriteria, data, options);
    }

    async shared(
        repository: TemplateDoc,
        sharedUsers: string[],
        options?: IDatabaseSaveOptions
    ): Promise<TemplateEntity> {
        repository.sharedUsers = sharedUsers;

        return this.templateRepository.save(repository, options);
    }

    async sharedMany(
        ids: string[],
        owners: string[],
        sharedUsers: string[],
        options?: IDatabaseSaveOptions
    ): Promise<boolean> {
        const findCriteria = {
            owner: { $in: owners },
            _id: { $in: ids },
        };

        return this.templateRepository.updateMany(
            findCriteria,
            { sharedUsers },
            options
        );
    }

    async selfDelete(
        repository: TemplateDoc,
        options?: IDatabaseSaveOptions
    ): Promise<TemplateDoc> {
        repository.selfDeletion = true;

        return this.templateRepository.save(repository, options);
    }

    async selfDeleteMany(
        ids: string[],
        owners: string[],
        options?: IDatabaseManyOptions
    ): Promise<boolean> {
        const findCriteria = {
            owner: { $in: owners },
            _id: { $in: ids },
        };

        const data = { selfDeletion: true };

        return this.templateRepository.updateMany(findCriteria, data, options);
    }
}
