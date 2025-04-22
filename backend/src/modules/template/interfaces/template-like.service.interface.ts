import { TemplateLikeCreateRequestDto } from '../dtos/request/template-like.create.request.dto';
import {
    IDatabaseCreateOptions,
    IDatabaseExistOptions,
    IDatabaseFindOneOptions,
} from '../../../common/database/interfaces/database.interface';
import { TemplateLikeDoc } from '../repository/entities/template-like.entity';
import { ClientSession } from 'mongoose';

export interface ITemplateLikeService {
    create(
        { user, template }: TemplateLikeCreateRequestDto,
        options?: IDatabaseCreateOptions
    ): Promise<TemplateLikeDoc>;
    findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<TemplateLikeDoc>;
    existsByIds(
        ids: string[],
        options?: IDatabaseExistOptions<ClientSession>
    ): Promise<boolean>;
}
