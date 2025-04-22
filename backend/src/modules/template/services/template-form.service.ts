import { Injectable } from '@nestjs/common';
import { ITemplateFormService } from 'src/modules/template/interfaces/template-form.service.interface';
import { TemplateFormRepository } from 'src/modules/template/repository/repositories/template-form.repository';
import { TemplateFormCreateRequestDto } from 'src/modules/template/dtos/request/template-form.create.request.dto';
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
    TemplateFormDoc,
    TemplateFormEntity,
} from 'src/modules/template/repository/entities/template-form.entity';
import { ClientSession } from 'mongoose';
import {
    TemplateDoc,
    TemplateEntity,
} from '../repository/entities/template.entity';
import { TemplateListResponseDto } from '../dtos/response/template.list.response.dto';
import { plainToInstance } from 'class-transformer';
import { TemplateFormListResponseDto } from '../dtos/response/template-form.list.response.dto';
import { ITemplateDoc } from '../interfaces/template.interface';
import { UserEntity } from '../../user/repository/entities/user.entity';
import { TemplateTagEntity } from '../repository/entities/template-tag.entity';
import { TemplateGetResponseDto } from '../dtos/response/template.get.response.dto';
import { TemplateUpdateRequestDto } from '../dtos/request/template.update.request.dto';
import { ITemplateFormDoc } from '../interfaces/template-form.interface';
import { TemplateFormGetResponseDto } from '../dtos/response/template-form.get.response.dto';
import { TemplateFormUpdateRequestDto } from '../dtos/request/template-form.update.request.dto';

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

    async findAll(
        find?: Record<string, any>,
        options?: IDatabaseFindAllOptions
    ): Promise<TemplateFormDoc[]> {
        return this.templateFormRepository.findAll<TemplateFormDoc>(
            find,
            options
        );
    }

    async getTotal(
        find?: Record<string, any>,
        options?: IDatabaseGetTotalOptions
    ): Promise<number> {
        return this.templateFormRepository.getTotal(find, options);
    }

    async mapList(
        template: TemplateFormDoc[]
    ): Promise<TemplateFormListResponseDto[]> {
        return plainToInstance(
            TemplateFormListResponseDto,
            template.map(u => u.toObject())
        );
    }

    async joinWithRelations(
        repository: TemplateFormDoc
    ): Promise<ITemplateFormDoc> {
        return repository.populate([
            {
                path: 'user',
                localField: 'user',
                foreignField: '_id',
                model: UserEntity.name,
            },
            {
                path: 'template',
                localField: 'template',
                foreignField: '_id',
                model: TemplateEntity.name,
            },
        ]);
    }

    async mapGetTemplateForm(
        template: ITemplateFormDoc
    ): Promise<TemplateFormGetResponseDto> {
        return plainToInstance(TemplateFormGetResponseDto, template.toObject());
    }

    async update(
        repository: TemplateFormDoc,
        { answers }: TemplateFormUpdateRequestDto,
        options?: IDatabaseSaveOptions
    ): Promise<TemplateFormDoc> {
        repository.answers = answers;

        return this.templateFormRepository.save(repository, options);
    }

    async selfDelete(
        repository: TemplateFormDoc,
        options?: IDatabaseSaveOptions
    ): Promise<TemplateFormDoc> {
        repository.selfDeletion = true;

        return this.templateFormRepository.save(repository, options);
    }

    async selfDeleteMany(
        ids: string[],
        owners: string[],
        options?: IDatabaseManyOptions
    ): Promise<boolean> {
        const findCriteria = {
            user: { $in: owners },
            _id: { $in: ids },
        };

        const data = { selfDeletion: true };

        return this.templateFormRepository.updateMany(
            findCriteria,
            data,
            options
        );
    }
}
