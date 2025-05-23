import { Module } from '@nestjs/common';
import { TemplateService } from 'src/modules/template/services/template.service';
import { TemplateRepositoryModule } from 'src/modules/template/repository/template.repository.module';
import { TemplateCommentService } from 'src/modules/template/services/template-comment.service';
import { TemplateFormService } from 'src/modules/template/services/template-form.service';
import { TemplateLikeService } from 'src/modules/template/services/template-like.service';
import { TemplateQuestionService } from 'src/modules/template/services/template-question.service';
import { TemplateTagService } from 'src/modules/template/services/template-tag.service';
import { TemplateSearchService } from './services/template-search.service';
import { ElasticsearchModule } from '../../common/elasticsearch/elasticsearch.module';
import { UserModule } from '../user/user.module';

@Module({
    imports: [TemplateRepositoryModule, ElasticsearchModule, UserModule],
    exports: [
        TemplateService,
        TemplateCommentService,
        TemplateFormService,
        TemplateLikeService,
        TemplateQuestionService,
        TemplateTagService,
        TemplateSearchService,
    ],
    providers: [
        TemplateService,
        TemplateCommentService,
        TemplateFormService,
        TemplateLikeService,
        TemplateQuestionService,
        TemplateTagService,
        TemplateSearchService,
    ],
    controllers: [],
})
export class TemplateModule {}
