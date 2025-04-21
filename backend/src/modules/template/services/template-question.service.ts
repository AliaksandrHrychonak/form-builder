import { Injectable } from '@nestjs/common';
import { ITemplateQuestionService } from 'src/modules/template/interfaces/template-question.service.interface';
import {
    IDatabaseCreateOptions,
    IDatabaseExistOptions,
    IDatabaseFindOneOptions,
} from 'src/common/database/interfaces/database.interface';
import {
    TemplateQuestionDoc,
    TemplateQuestionEntity,
} from 'src/modules/template/repository/entities/template-question.entity';
import { TemplateQuestionRepository } from 'src/modules/template/repository/repositories/template-question.repository';
import { TemplateQuestionCreateRequestDto } from 'src/modules/template/dtos/request/template-question.create.request.dto';
import { ClientSession } from 'mongoose';

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
}
