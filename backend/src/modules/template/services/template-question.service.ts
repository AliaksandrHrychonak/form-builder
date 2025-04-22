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
import { ClientSession } from 'mongoose';
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

        return this.templateQuestionRepository.create<TemplateQuestionEntity>(
            createEntity,
            createOptions
        );
    }

    async findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<TemplateQuestionDoc> {
        return await this.templateQuestionRepository.findOneById(_id, options);
    }

    async existsByIds(
        ids: string[],
        options?: IDatabaseExistOptions<ClientSession>
    ): Promise<boolean> {
        if (ids && ids.length > 0) {
            return this.templateQuestionRepository.exists({
                _id: { $in: ids },
            });
        }

        return true;
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
        }: TemplateQuestionUpdateRequestDto,
        options?: IDatabaseSaveOptions
    ): Promise<TemplateQuestionDoc> {
        repository.title = title;
        repository.description = description;
        repository.options = updateOptions;
        repository.required = required;
        repository.validation = validation;
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

    async selfDeleteMany(
        find: Record<string, any>,
        options?: IDatabaseManyOptions
    ): Promise<boolean> {
        const data = { selfDeletion: true };

        return this.templateQuestionRepository.updateMany(find, data, options);
    }
}
