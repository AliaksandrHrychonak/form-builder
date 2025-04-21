import { Injectable } from '@nestjs/common';
import { ITemplateFormService } from 'src/modules/template/interfaces/template-form.service.interface';
import { TemplateFormRepository } from 'src/modules/template/repository/repositories/template-form.repository';
import { TemplateFormCreateRequestDto } from 'src/modules/template/dtos/request/template-form.create.request.dto';
import {
    IDatabaseCreateOptions,
    IDatabaseExistOptions,
    IDatabaseFindOneOptions,
} from 'src/common/database/interfaces/database.interface';
import {
    TemplateFormDoc,
    TemplateFormEntity,
} from 'src/modules/template/repository/entities/template-form.entity';
import { ClientSession } from 'mongoose';

@Injectable()
export class TemplateFormService implements ITemplateFormService {
    constructor(
        private readonly templateFormRepository: TemplateFormRepository
    ) {}

    async create(
        { user, template, answers }: TemplateFormCreateRequestDto,
        options?: IDatabaseCreateOptions
    ): Promise<TemplateFormDoc> {
        const create: TemplateFormEntity = new TemplateFormEntity();
        create.answers = answers;
        create.user = user;
        create.template = template;

        return this.templateFormRepository.create<TemplateFormEntity>(
            create,
            options
        );
    }

    async findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<TemplateFormDoc> {
        return this.templateFormRepository.findOneById(_id, options);
    }

    async existsByIds(
        ids: string[],
        options?: IDatabaseExistOptions<ClientSession>
    ): Promise<boolean> {
        if (ids && ids.length > 0) {
            return this.templateFormRepository.exists({
                _id: { $in: ids },
            });
        }

        return true;
    }
}
