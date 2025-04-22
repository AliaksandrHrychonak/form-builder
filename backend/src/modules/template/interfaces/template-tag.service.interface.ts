import { TemplateTagCreateRequestDto } from 'src/modules/template/dtos/request/template-tag.create.request.dto';
import {
    IDatabaseCreateOptions,
    IDatabaseExistOptions,
    IDatabaseFindOneOptions,
} from 'src/common/database/interfaces/database.interface';
import { TemplateTagDoc } from 'src/modules/template/repository/entities/template-tag.entity';
import { ClientSession } from 'mongoose';

export interface ITemplateTagService {
    create(
        { name, description, color }: TemplateTagCreateRequestDto,
        options?: IDatabaseCreateOptions
    ): Promise<TemplateTagDoc>;
    findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<TemplateTagDoc>;
    existsByIds(
        ids: string[],
        options?: IDatabaseExistOptions<ClientSession>
    ): Promise<boolean>;
}
