import { Injectable } from '@nestjs/common';
import { ITemplateLikeService } from 'src/modules/template/interfaces/template-like.service.interface';
import { TemplateLikeRepository } from 'src/modules/template/repository/repositories/template-like.repository';
import { TemplateLikeCreateRequestDto } from 'src/modules/template/dtos/request/template-like.create.request.dto';
import {
    IDatabaseCreateOptions,
    IDatabaseExistOptions,
    IDatabaseFindOneOptions,
    IDatabaseManyOptions,
} from 'src/common/database/interfaces/database.interface';
import {
    TemplateLikeDoc,
    TemplateLikeEntity,
} from 'src/modules/template/repository/entities/template-like.entity';

@Injectable()
export class TemplateLikeService implements ITemplateLikeService {
    constructor(
        private readonly templateLikeRepository: TemplateLikeRepository
    ) {}

    async create(
        { user, template }: TemplateLikeCreateRequestDto,
        options?: IDatabaseCreateOptions
    ): Promise<TemplateLikeDoc> {
        const create: TemplateLikeEntity = new TemplateLikeEntity();
        create.user = user;
        create.template = template;

        return this.templateLikeRepository.create<TemplateLikeEntity>(
            create,
            options
        );
    }

    async findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<TemplateLikeDoc> {
        return await this.templateLikeRepository.findOneById(_id, options);
    }

    async exists(
        find: Record<string, any>,
        options?: IDatabaseExistOptions
    ): Promise<boolean> {
        return this.templateLikeRepository.exists(find, options);
    }

    async selfDeleteBulk(
        find: Record<string, any>,
        options?: IDatabaseManyOptions
    ): Promise<boolean> {
        const data = { selfDeletion: true };

        return this.templateLikeRepository.updateMany(find, data, options);
    }
}
