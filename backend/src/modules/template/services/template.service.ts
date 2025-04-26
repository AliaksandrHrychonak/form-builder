import { Injectable } from '@nestjs/common';
import { ITemplateService } from 'src/modules/template/interfaces/template.service.interface';
import {
    IDatabaseCreateOptions,
    IDatabaseExistOptions,
    IDatabaseFindAllOptions,
    IDatabaseFindOneOptions,
    IDatabaseGetTotalOptions,
    IDatabaseManyOptions,
} from 'src/common/database/interfaces/database.interface';
import { ConfigService } from '@nestjs/config';
import { TemplateRepository } from 'src/modules/template/repository/repositories/template.repository';
import { TemplateCreateRequestDto } from 'src/modules/template/dtos/request/template.create.request.dto';
import {
    TemplateDoc,
    TemplateEntity,
} from 'src/modules/template/repository/entities/template.entity';
import { TemplateTagEntity } from '../repository/entities/template-tag.entity';
import { plainToInstance } from 'class-transformer';
import { ITemplateDoc } from '../interfaces/template.interface';
import { TemplateGetResponseDto } from '../dtos/response/template.get.response.dto';
import { TemplateListResponseDto } from '../dtos/response/template.list.response.dto';
import { UserEntity } from '../../user/repository/entities/user.entity';
import { TemplateSearchService } from './template-search.service';

@Injectable()
export class TemplateService implements ITemplateService {
    private readonly uploadPath: string;

    constructor(
        private readonly templateRepository: TemplateRepository,
        private readonly configService: ConfigService,
        private readonly templateSearchService: TemplateSearchService
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
            owner,
            sharedUsers,
            topic,
        }: TemplateCreateRequestDto,
        options?: IDatabaseCreateOptions
    ): Promise<TemplateDoc> {
        const create: TemplateEntity = new TemplateEntity();
        create.title = title;
        create.description = description;
        create.isPublic = isPublic;
        create.owner = owner;
        create.sharedUsers = sharedUsers;
        create.topic = topic;

        return await this.templateRepository.create(create, options);
    }

    async findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<TemplateDoc> {
        return this.templateRepository.findOneById<TemplateDoc>(_id, options);
    }

    async exists(
        find: Record<string, any>,
        options?: IDatabaseExistOptions
    ): Promise<boolean> {
        return this.templateRepository.exists(find, options);
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
                path: 'sharedUsers',
                localField: 'sharedUsers',
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

    async selfDeleteBulk(
        find: Record<string, any>,
        options?: IDatabaseManyOptions
    ): Promise<boolean> {
        const data = { selfDeletion: true };

        return this.templateRepository.updateMany(find, data, options);
    }
}
