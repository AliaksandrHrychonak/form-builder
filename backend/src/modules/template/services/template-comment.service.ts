import { Injectable } from '@nestjs/common';
import { ITemplateCommentService } from 'src/modules/template/interfaces/template-comment.service.interface';
import { TemplateCommentRepository } from 'src/modules/template/repository/repositories/template-comment.repository';
import {
    IDatabaseCreateOptions,
    IDatabaseExistOptions,
    IDatabaseFindOneOptions,
} from 'src/common/database/interfaces/database.interface';
import { TemplateCommentCreateRequestDto } from 'src/modules/template/dtos/request/template-comment.create.request.dto';
import {
    TemplateCommentDoc,
    TemplateCommentEntity,
} from 'src/modules/template/repository/entities/template-comment.entity';
import { ClientSession } from 'mongoose';

@Injectable()
export class TemplateCommentService implements ITemplateCommentService {
    constructor(
        private readonly templateCommentRepository: TemplateCommentRepository
    ) {}

    async create(
        { comment, user, template }: TemplateCommentCreateRequestDto,
        options?: IDatabaseCreateOptions
    ): Promise<TemplateCommentDoc> {
        const create: TemplateCommentEntity = new TemplateCommentEntity();
        create.comment = comment;
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

    async existsByIds(
        ids: string[],
        options?: IDatabaseExistOptions<ClientSession>
    ): Promise<boolean> {
        return this.templateCommentRepository.exists({
            _id: { $in: ids },
        });
    }
}
