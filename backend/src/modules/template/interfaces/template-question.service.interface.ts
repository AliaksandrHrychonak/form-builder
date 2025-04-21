import { TemplateQuestionCreateRequestDto } from '../dtos/request/template-question.create.request.dto';
import {
    IDatabaseCreateOptions,
    IDatabaseExistOptions,
    IDatabaseFindOneOptions,
} from '../../../common/database/interfaces/database.interface';
import { TemplateQuestionDoc } from '../repository/entities/template-question.entity';
import { ClientSession } from 'mongoose';

export interface ITemplateQuestionService {
    create(
        {
            title,
            description,
            options,
            order,
            required,
            validation,
        }: TemplateQuestionCreateRequestDto,
        createOptions?: IDatabaseCreateOptions
    ): Promise<TemplateQuestionDoc>;
    findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<TemplateQuestionDoc>;
    existsByIds(
        ids: string[],
        options?: IDatabaseExistOptions<ClientSession>
    ): Promise<boolean>;
}
