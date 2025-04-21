import { TemplateFormCreateRequestDto } from '../dtos/request/template-form.create.request.dto';
import {
    IDatabaseCreateOptions,
    IDatabaseExistOptions,
    IDatabaseFindOneOptions,
} from '../../../common/database/interfaces/database.interface';
import { TemplateFormDoc } from '../repository/entities/template-form.entity';
import { ClientSession } from 'mongoose';

export interface ITemplateFormService {
    create(
        { user, template, answers }: TemplateFormCreateRequestDto,
        options?: IDatabaseCreateOptions
    ): Promise<TemplateFormDoc>;
    findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<TemplateFormDoc>;
    existsByIds(
        ids: string[],
        options?: IDatabaseExistOptions<ClientSession>
    ): Promise<boolean>;
}
