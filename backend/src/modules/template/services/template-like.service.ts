import { Injectable } from '@nestjs/common';
import { ITemplateLikeService } from 'src/modules/template/interfaces/template-like.service.interface';
import { TemplateLikeRepository } from 'src/modules/template/repository/repositories/template-like.repository';
import { TemplateLikeCreateRequestDto } from 'src/modules/template/dtos/request/template-like.create.request.dto';
import {
    IDatabaseCreateOptions,
    IDatabaseExistOptions,
    IDatabaseFindOneOptions,
} from 'src/common/database/interfaces/database.interface';
import {
    TemplateLikeDoc,
    TemplateLikeEntity,
} from 'src/modules/template/repository/entities/template-like.entity';
import { ClientSession } from 'mongoose';

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

    async existsByIds(
        ids: string[],
        options?: IDatabaseExistOptions<ClientSession>
    ): Promise<boolean> {
        return this.templateLikeRepository.exists({
            _id: { $in: ids },
        });
    }
}
