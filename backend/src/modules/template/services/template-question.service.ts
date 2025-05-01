import { Injectable } from '@nestjs/common';
import { ITemplateQuestionService } from 'src/modules/template/interfaces/template-question.service.interface';
import {
    IDatabaseCreateOptions,
    IDatabaseExistOptions,
    IDatabaseFindAllOptions,
    IDatabaseFindOneOptions,
    IDatabaseGetTotalOptions,
    IDatabaseManyOptions,
    IDatabaseSaveOptions,
} from 'src/common/database/interfaces/database.interface';
import {
    TemplateQuestionDoc,
    TemplateQuestionEntity,
} from 'src/modules/template/repository/entities/template-question.entity';
import { TemplateQuestionRepository } from 'src/modules/template/repository/repositories/template-question.repository';
import { TemplateQuestionCreateRequestDto } from 'src/modules/template/dtos/request/template-question.create.request.dto';
import { TemplateEntity } from '../repository/entities/template.entity';
import { plainToInstance } from 'class-transformer';
import { TemplateQuestionListResponseDto } from '../dtos/response/template-queston.list.response.dto';
import { ITemplateQuestionDoc } from '../interfaces/template-question.interface';
import { TemplateQuestionGetResponseDto } from '../dtos/response/template-question.get.response.dto';
import { TemplateQuestionUpdateRequestDto } from '../dtos/request/template-question.update.request.dto';

@Injectable()
export class TemplateQuestionService implements ITemplateQuestionService {
    constructor(
        private readonly templateQuestionRepository: TemplateQuestionRepository
    ) {}

    async create(
        {
            title,
            description,
            options,
            order,
            required,
            validation,
            type,
            template,
            user,
        }: TemplateQuestionCreateRequestDto,
        createOptions?: IDatabaseCreateOptions
    ): Promise<TemplateQuestionDoc> {
        const createEntity: TemplateQuestionEntity =
            new TemplateQuestionEntity();
        createEntity.title = title;
        createEntity.description = description;
        createEntity.options = options;
        createEntity.order = order;
        createEntity.required = required;
        createEntity.validation = validation;
        createEntity.type = type;
        createEntity.template = template;
        createEntity.user = user;

        return this.templateQuestionRepository.create<TemplateQuestionEntity>(
            createEntity,
            createOptions
        );
    }

    async findOne(
        find: Record<string, any>,
        options?: IDatabaseFindOneOptions
    ): Promise<TemplateQuestionDoc> {
        return await this.templateQuestionRepository.findOne(find, options);
    }

    async findOneWithTemplate(
        find: Record<string, any>,
        options?: IDatabaseFindOneOptions
    ): Promise<ITemplateQuestionDoc> {
        return await this.templateQuestionRepository.findOne(find, {
            ...options,
            join: {
                path: 'template',
                localField: 'template',
                foreignField: '_id',
                model: TemplateEntity.name,
            },
        });
    }

    async exists(
        find: Record<string, any>,
        options?: IDatabaseExistOptions
    ): Promise<boolean> {
        return this.templateQuestionRepository.exists(find, options);
    }

    async findAll(
        find?: Record<string, any>,
        options?: IDatabaseFindAllOptions
    ): Promise<TemplateQuestionDoc[]> {
        return this.templateQuestionRepository.findAll<TemplateQuestionDoc>(
            find,
            options
        );
    }

    async getTotal(
        find?: Record<string, any>,
        options?: IDatabaseGetTotalOptions
    ): Promise<number> {
        return this.templateQuestionRepository.getTotal(find, options);
    }

    async mapList(
        template: TemplateQuestionDoc[]
    ): Promise<TemplateQuestionListResponseDto[]> {
        return plainToInstance(
            TemplateQuestionListResponseDto,
            template.map(u => u.toObject())
        );
    }

    async joinWithRelations(
        repository: TemplateQuestionDoc
    ): Promise<ITemplateQuestionDoc> {
        return repository.populate([
            {
                path: 'template',
                localField: 'template',
                foreignField: '_id',
                model: TemplateEntity.name,
            },
        ]);
    }

    async mapGetTemplateQuestion(
        template: ITemplateQuestionDoc
    ): Promise<TemplateQuestionGetResponseDto> {
        return plainToInstance(
            TemplateQuestionGetResponseDto,
            template.toObject()
        );
    }

    async update(
        repository: TemplateQuestionDoc,
        {
            title,
            description,
            options: updateOptions,
            required,
            validation,
            type,
            order,
        }: TemplateQuestionUpdateRequestDto,
        options?: IDatabaseSaveOptions
    ): Promise<TemplateQuestionDoc> {
        repository.title = title;
        repository.description = description;
        repository.options = updateOptions;
        repository.required = required;
        repository.validation = validation;
        repository.order = order;
        repository.type = type;

        return this.templateQuestionRepository.save(repository, options);
    }

    async selfDelete(
        repository: TemplateQuestionDoc,
        options?: IDatabaseSaveOptions
    ): Promise<TemplateQuestionDoc> {
        repository.selfDeletion = true;

        return this.templateQuestionRepository.save(repository, options);
    }

    async selfDeleteBulk(
        find: Record<string, any>,
        options?: IDatabaseManyOptions
    ): Promise<boolean> {
        const data = { selfDeletion: true };

        return this.templateQuestionRepository.updateMany(find, data, options);
    }

    async deleteBulk(): Promise<boolean> {
        return this.templateQuestionRepository.deleteMany({});
    }
}
