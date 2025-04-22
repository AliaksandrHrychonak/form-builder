import { Injectable } from '@nestjs/common';
import { TemplateTagCreateRequestDto } from 'src/modules/template/dtos/request/template-tag.create.request.dto';
import { ITemplateTagService } from 'src/modules/template/interfaces/template-tag.service.interface';
import { TemplateTagRepository } from 'src/modules/template/repository/repositories/template-tag.repository';
import {
    IDatabaseCreateOptions,
    IDatabaseExistOptions,
    IDatabaseFindOneOptions,
} from 'src/common/database/interfaces/database.interface';
import {
    TemplateTagDoc,
    TemplateTagEntity,
} from 'src/modules/template/repository/entities/template-tag.entity';
import { ClientSession } from 'mongoose';

@Injectable()
export class TemplateTagService implements ITemplateTagService {
    constructor(
        private readonly templateTagRepository: TemplateTagRepository
    ) {}

    async create(
        { name, description, color }: TemplateTagCreateRequestDto,
        options?: IDatabaseCreateOptions
    ): Promise<TemplateTagDoc> {
        const create: TemplateTagEntity = new TemplateTagEntity();
        create.name = name;
        create.description = description;
        create.color = color;

        return this.templateTagRepository.create<TemplateTagEntity>(
            create,
            options
        );
    }

    async findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<TemplateTagDoc> {
        return await this.templateTagRepository.findOneById(_id, options);
    }

    async existsByIds(
        ids: string[],
        options?: IDatabaseExistOptions<ClientSession>
    ): Promise<boolean> {
        if (ids && ids.length > 0) {
            return this.templateTagRepository.exists({
                _id: { $in: ids },
            });
        }

        return true;
    }
}
