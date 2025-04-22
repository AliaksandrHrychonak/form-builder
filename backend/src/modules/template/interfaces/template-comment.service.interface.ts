import { TemplateCommentCreateRequestDto } from '../dtos/request/template-comment.create.request.dto';
import {
    IDatabaseCreateOptions,
    IDatabaseExistOptions,
    IDatabaseFindOneOptions,
} from '../../../common/database/interfaces/database.interface';
import { TemplateCommentDoc } from '../repository/entities/template-comment.entity';
import { ClientSession } from 'mongoose';

export interface ITemplateCommentService {
    create(
        { comment, user, template }: TemplateCommentCreateRequestDto,
        options?: IDatabaseCreateOptions
    ): Promise<TemplateCommentDoc>;
    findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<TemplateCommentDoc>;

    existsByIds(
        ids: string[],
        options?: IDatabaseExistOptions<ClientSession>
    ): Promise<boolean>;
}
