import { Injectable, OnModuleInit } from '@nestjs/common';
import { ElasticsearchService } from '../../../common/elasticsearch/services/elasticsearch.service';
import { ITemplateSearchDoc } from '../interfaces/template-search.interface';
import { TemplateDatabaseName } from '../repository/entities/template.entity';
import { IElasticsearchQuery } from '../../../common/elasticsearch/interfaces/elasticsearch.interface';
import { ENUM_ELASTICSEARCH_ORDER_DIRECTION_TYPE } from '../../../common/elasticsearch/constants/elasticsearch.enum.constant';
import { ITemplateDoc } from '../interfaces/template.interface';
import { WriteResponseBase } from '@elastic/elasticsearch/lib/api/types';

@Injectable()
export class TemplateSearchService implements OnModuleInit {
    private readonly INDEX_NAME = TemplateDatabaseName;

    constructor(private readonly elasticsearchService: ElasticsearchService) {}

    async onModuleInit() {
        await this.createIndex();
    }

    private async createIndex(): Promise<void> {
        const exists = await this.elasticsearchService.indexExists({
            index: this.INDEX_NAME,
        });

        if (!exists) {
            await this.elasticsearchService.createIndex({
                index: this.INDEX_NAME,
                mappings: {
                    properties: {
                        _id: { type: 'keyword' },
                        title: {
                            type: 'text',
                            fields: {
                                keyword: { type: 'keyword' },
                            },
                        },
                        description: { type: 'text' },
                        topic: { type: 'keyword' },
                        isPublic: { type: 'boolean' },
                        createdAt: { type: 'date' },
                        updatedAt: { type: 'date' },
                        owner: {
                            properties: {
                                _id: { type: 'keyword' },
                                firstName: { type: 'keyword' },
                                lastName: { type: 'keyword' },
                                email: { type: 'keyword' },
                            },
                        },

                        sharedUsers: {
                            properties: {
                                _id: { type: 'keyword' },
                                firstName: { type: 'keyword' },
                                lastName: { type: 'keyword' },
                                email: { type: 'keyword' },
                            },
                        },

                        tags: {
                            properties: {
                                _id: { type: 'keyword' },
                                name: { type: 'keyword' },
                                description: { type: 'keyword' },
                                color: { type: 'keyword' },
                            },
                        },

                        popularityScore: { type: 'integer' },

                        questions: {
                            properties: {
                                _id: { type: 'keyword' },
                                title: { type: 'text' },
                                description: { type: 'text' },
                            },
                        },

                        comments: {
                            properties: {
                                _id: { type: 'keyword' },
                                comment: { type: 'text' },
                            },
                        },
                    },
                },
            });
        }
    }

    async search(
        filters: {
            must?: any[];
            filter?: any[];
            should?: any[];
            minimumShouldMatch?: number;
        },
        elasticQuery: IElasticsearchQuery,
        limit: number,
        offset: number,
        order: {
            field: string;
            direction: ENUM_ELASTICSEARCH_ORDER_DIRECTION_TYPE;
        }
    ): Promise<{
        items: ITemplateSearchDoc[];
        total: number;
        page: number;
        limit: number;
        totalPage: number;
    }> {
        const searchQuery: any = {
            index: this.INDEX_NAME,
            body: {
                query: {
                    bool: {
                        must: [...(filters.must || [])],
                        filter: [...(filters.filter || [])],
                        should: [...(filters.should || [])],
                        minimum_should_match: filters.minimumShouldMatch,
                    },
                },
                sort: [
                    {
                        [order?.field || 'createdAt']: {
                            order: (
                                order?.direction ||
                                ENUM_ELASTICSEARCH_ORDER_DIRECTION_TYPE.DESC
                            ).toLowerCase(),
                        },
                    },
                ],
                from: offset,
                size: limit,
            },
        };

        if (elasticQuery?.must?.length > 0) {
            searchQuery.body.query.bool.must.push(...elasticQuery.must);
        }

        if (elasticQuery?.filter?.length > 0) {
            searchQuery.body.query.bool.filter.push(...elasticQuery.filter);
        }

        if (elasticQuery?.should?.length > 0) {
            searchQuery.body.query.bool.should = elasticQuery.should;
            searchQuery.body.query.bool.minimum_should_match = 1;
        }

        if (elasticQuery?.must_not?.length > 0) {
            searchQuery.body.query.bool.must_not = elasticQuery.must_not;
        }

        const result =
            await this.elasticsearchService.searchWithSettings<ITemplateSearchDoc>(
                searchQuery
            );

        const items = result.hits.hits.map(hit => ({
            ...(hit._source as ITemplateSearchDoc),
            _id: hit._id,
            score: hit._score,
        }));

        const total =
            typeof result.hits.total === 'number'
                ? result.hits.total
                : result.hits.total.value;
        const page = Math.floor(offset / limit) + 1;
        const totalPage = Math.ceil(total / limit);

        return {
            items,
            total,
            page,
            limit,
            totalPage,
        };
    }

    async indexTemplate(template: ITemplateDoc): Promise<WriteResponseBase> {
        const searchDoc: Omit<ITemplateSearchDoc, '_id'> = {
            title: template.title,
            description: template.description,
            isPublic: template.isPublic,
            topic: template.topic,
            createdAt: template.createdAt,
            updatedAt: template.updatedAt,
            owner: {
                _id: template.owner._id,
                firstName: template.owner.firstName,
                lastName: template.owner.lastName,
                email: template.owner.email,
            },
            sharedUsers: template.sharedUsers.map(user => ({
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            })),
            popularityScore: 0,
            questions: [],
            comments: [],
            tags: [],
        } as ITemplateSearchDoc;

        return await this.elasticsearchService.index({
            index: this.INDEX_NAME,
            id: template._id,
            document: searchDoc,
        });
    }

    async deleteTemplates(templateIds: string[]): Promise<void> {
        return await this.elasticsearchService.bulkDelete({
            index: this.INDEX_NAME,
            ids: templateIds,
        });
    }

    async updateTemplatePartial(
        templateId: string,
        updateData: Partial<ITemplateSearchDoc>
    ): Promise<void> {
        await this.elasticsearchService.update({
            index: this.INDEX_NAME,
            id: templateId,
            doc: updateData,
        });
    }

    async addQuestions(
        templateId: string,
        questions: Array<{
            _id: string;
            title: string;
            description: string;
        }>
    ): Promise<void> {
        await this.elasticsearchService.update({
            index: this.INDEX_NAME,
            id: templateId,
            script: {
                source: 'for (question in params.questions) { ctx._source.questions.add(question) }',
                params: {
                    questions: questions,
                },
            },
        });
    }

    async removeQuestions(
        templateId: string,
        questionIds: string[]
    ): Promise<void> {
        await this.elasticsearchService.update({
            index: this.INDEX_NAME,
            id: templateId,
            script: {
                source: 'ctx._source.questions.removeIf(question -> params.questionIds.contains(question._id))',
                params: {
                    questionIds: questionIds,
                },
            },
        });
    }

    async addComment(
        templateId: string,
        comment: { _id: string; comment: string }
    ): Promise<void> {
        await this.elasticsearchService.update({
            index: this.INDEX_NAME,
            id: templateId,
            script: {
                source: 'ctx._source.comments.add(params.comment)',
                params: {
                    comment: comment,
                },
            },
        });
    }

    async removeComment(templateId: string, commentId: string): Promise<void> {
        await this.elasticsearchService.update({
            index: this.INDEX_NAME,
            id: templateId,
            script: {
                source: 'ctx._source.comments.removeIf(comment -> comment._id == params.commentId)',
                params: {
                    commentId: commentId,
                },
            },
        });
    }

    async addSharedUser(
        templateId: string,
        user: {
            _id: string;
            firstName: string;
            lastName: string;
            email: string;
        }
    ): Promise<void> {
        await this.elasticsearchService.update({
            index: this.INDEX_NAME,
            id: templateId,
            script: {
                source: 'ctx._source.sharedUsers.add(params.user)',
                params: {
                    user: user,
                },
            },
        });
    }

    async removeSharedUser(templateId: string, userId: string): Promise<void> {
        await this.elasticsearchService.update({
            index: this.INDEX_NAME,
            id: templateId,
            script: {
                source: 'ctx._source.sharedUsers.removeIf(user -> user._id == params.userId)',
                params: {
                    userId: userId,
                },
            },
        });
    }

    async addTag(
        templateId: string,
        tag: {
            _id: string;
            name: string;
            description: string;
            color: string;
        }
    ): Promise<void> {
        await this.elasticsearchService.update({
            index: this.INDEX_NAME,
            id: templateId,
            script: {
                source: 'ctx._source.tags.add(params.tag)',
                params: {
                    tag: tag,
                },
            },
        });
    }

    async removeTag(templateId: string, tagId: string): Promise<void> {
        await this.elasticsearchService.update({
            index: this.INDEX_NAME,
            id: templateId,
            script: {
                source: 'ctx._source.tags.removeIf(tag -> tag._id == params.tagId)',
                params: {
                    tagId: tagId,
                },
            },
        });
    }

    async updatePopularityScore(
        templateId: string,
        incrementBy: number
    ): Promise<void> {
        await this.elasticsearchService.update({
            index: this.INDEX_NAME,
            id: templateId,
            script: {
                source: 'ctx._source.popularityScore = (ctx._source.popularityScore ?: 0) + params.increment; if (ctx._source.popularityScore < 0) { ctx._source.popularityScore = 0; }',
                params: {
                    increment: incrementBy,
                },
            },
        });
    }
}
