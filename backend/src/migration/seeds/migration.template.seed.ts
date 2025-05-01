import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { TemplateService } from '../../modules/template/services/template.service';
import { TemplateSearchService } from '../../modules/template/services/template-search.service';
import { TemplateTagService } from '../../modules/template/services/template-tag.service';
import { TemplateCommentService } from '../../modules/template/services/template-comment.service';
import { TemplateFormService } from '../../modules/template/services/template-form.service';
import { TemplateQuestionService } from '../../modules/template/services/template-question.service';

@Injectable()
export class MigrationTemplateSeed {
    constructor(
        private readonly templateService: TemplateService,
        private readonly templateTagService: TemplateTagService,
        private readonly templateCommentService: TemplateCommentService,
        private readonly templateFormService: TemplateFormService,
        private readonly templateQuestionService: TemplateQuestionService,
        private readonly templateSearchService: TemplateSearchService
    ) {}

    @Command({
        command: 'seed:template',
        describe: 'seeds template',
    })
    async seeds(): Promise<void> {
        const baseTags = [
            {
                name: 'Performance Optimization',
                description:
                    'Tips and techniques for improving application speed',
                color: '#FF6B6B',
            },
            {
                name: 'Security',
                description: 'Best practices for application security',
                color: '#4ECDC4',
            },

            {
                name: 'Testing',
                description: 'Unit, integration and e2e testing approaches',
                color: '#45B7D1',
            },
            {
                name: 'Architecture',
                description: 'Application architecture patterns and solutions',
                color: '#96CEB4',
            },
            {
                name: 'DevOps',
                description: 'Deployment and infrastructure automation',
                color: '#D4A5A5',
            },
            {
                name: 'Frontend',
                description: 'UI/UX development practices',
                color: '#9B59B6',
            },
            {
                name: 'Backend',
                description: 'Server-side development patterns',
                color: '#3498DB',
            },
            {
                name: 'Database',
                description: 'Database design and optimization',
                color: '#1ABC9C',
            },
            {
                name: 'Mobile',
                description: 'Mobile app development specifics',
                color: '#F1C40F',
            },
            {
                name: 'API Design',
                description: 'REST and GraphQL API best practices',
                color: '#E74C3C',
            },
            {
                name: 'Cloud Native',
                description: 'Cloud platforms and microservices',
                color: '#2ECC71',
            },
            {
                name: 'Machine Learning',
                description: 'AI and ML implementation guides',
                color: '#8E44AD',
            },
            {
                name: 'Code Quality',
                description: 'Code style and maintainability practices',
                color: '#E67E22',
            },
            {
                name: 'Monitoring',
                description: 'Application monitoring and logging',
                color: '#16A085',
            },
            {
                name: 'Authentication',
                description: 'User authentication methods and security',
                color: '#D35400',
            },
            {
                name: 'Data Analysis',
                description: 'Big data processing and analytics',
                color: '#27AE60',
            },
            {
                name: 'Scalability',
                description: 'Horizontal and vertical scaling strategies',
                color: '#3498DB',
            },
            {
                name: 'Documentation',
                description: 'Code and API documentation practices',
                color: '#F39C12',
            },
            {
                name: 'Automation',
                description: 'Process and workflow automation',
                color: '#C0392B',
            },
            {
                name: 'Accessibility',
                description: 'Web accessibility guidelines and implementations',
                color: '#2980B9',
            },
        ];
        try {
            await Promise.all([this.templateTagService.createMany(baseTags)]);
        } catch (err: any) {
            throw new Error(err.message);
        }

        return;
    }

    @Command({
        command: 'remove:template',
        describe: 'remove template',
    })
    async remove(): Promise<void> {
        try {
            await Promise.all([
                this.templateService.deleteBulk(),
                this.templateTagService.deleteBulk(),
                this.templateCommentService.deleteBulk(),
                this.templateFormService.deleteBulk(),
                this.templateQuestionService.deleteBulk(),
            ]);

            await this.templateSearchService.deleteIndices();
        } catch (err: any) {
            throw new Error(err.message);
        }

        return;
    }
}
