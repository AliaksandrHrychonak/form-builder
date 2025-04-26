import { Injectable } from '@nestjs/common';
import { ITemplateCommentService } from 'src/modules/template/interfaces/template-comment.service.interface';
import { TemplateCommentRepository } from 'src/modules/template/repository/repositories/template-comment.repository';
import {
    IDatabaseCreateOptions,
    IDatabaseExistOptions,
    IDatabaseFindAllOptions,
    IDatabaseFindOneOptions,
    IDatabaseManyOptions,
} from 'src/common/database/interfaces/database.interface';
import { TemplateCommentCreateRequestDto } from 'src/modules/template/dtos/request/template-comment.create.request.dto';
import {
    TemplateCommentDoc,
    TemplateCommentEntity,
} from 'src/modules/template/repository/entities/template-comment.entity';

@Injectable()
export class TemplateCommentService implements ITemplateCommentService {
    constructor(
        private readonly templateCommentRepository: TemplateCommentRepository
    ) {}

    async findAll(
        find?: Record<string, any>,
        options?: IDatabaseFindAllOptions
    ): Promise<TemplateCommentDoc[]> {
        return this.templateCommentRepository.findAll<TemplateCommentDoc>(
            find,
            options
        );
    }

    async create(
        { text, user, template }: TemplateCommentCreateRequestDto,
        options?: IDatabaseCreateOptions
    ): Promise<TemplateCommentDoc> {
        const create: TemplateCommentEntity = new TemplateCommentEntity();
        create.text = text;
        create.user = user;
        create.template = template;

        return this.templateCommentRepository.create<TemplateCommentEntity>(
            create,
            options
        );
    }

    async findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<TemplateCommentDoc> {
        return this.templateCommentRepository.findOneById(_id, options);
    }

    async exists(
        find: Record<string, any>,
        options?: IDatabaseExistOptions
    ): Promise<boolean> {
        return this.templateCommentRepository.exists(find, options);
    }

    async selfDeleteBulk(
        find: Record<string, any>,
        options?: IDatabaseManyOptions
    ): Promise<boolean> {
        const data = { selfDeletion: true };

        return this.templateCommentRepository.updateMany(find, data, options);
    }
}
