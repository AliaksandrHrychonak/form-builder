import { TemplateQuestionCreateRequestDto } from '../dtos/request/template-question.create.request.dto';
import {
    IDatabaseCreateOptions,
    IDatabaseExistOptions,
    IDatabaseFindAllOptions,
    IDatabaseFindOneOptions,
    IDatabaseGetTotalOptions,
    IDatabaseSaveOptions,
} from '../../../common/database/interfaces/database.interface';
import { TemplateQuestionDoc } from '../repository/entities/template-question.entity';
import { ClientSession } from 'mongoose';
import { TemplateQuestionListResponseDto } from '../dtos/response/template-queston.list.response.dto';
import { TemplateQuestionUpdateRequestDto } from '../dtos/request/template-question.update.request.dto';

export interface ITemplateQuestionService {
    create(
        data: TemplateQuestionCreateRequestDto,
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
    mapList(
        template: TemplateQuestionDoc[]
    ): Promise<TemplateQuestionListResponseDto[]>;
    getTotal(
        find?: Record<string, any>,
        options?: IDatabaseGetTotalOptions
    ): Promise<number>;
    findAll(
        find?: Record<string, any>,
        options?: IDatabaseFindAllOptions
    ): Promise<TemplateQuestionDoc[]>;
    update(
        repository: TemplateQuestionDoc,
        data: TemplateQuestionUpdateRequestDto,
        options?: IDatabaseSaveOptions
    ): Promise<TemplateQuestionDoc>;
}
