import { Global, Module } from '@nestjs/common';
import { ElasticsearchModule as NestElasticsearchModule } from '@nestjs/elasticsearch';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ElasticsearchService } from './services/elasticsearch.service';

@Global()
@Module({
    imports: [
        NestElasticsearchModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => {
                return {
                    node: configService.get('elasticsearch.node'),
                    auth: {
                        username: configService.get(
                            'elasticsearch.auth.username'
                        ),
                        password: configService.get(
                            'elasticsearch.auth.password'
                        ),
                    },
                    maxRetries: configService.get('elasticsearch.maxRetries'),
                    requestTimeout: configService.get(
                        'elasticsearch.requestTimeout'
                    ),
                    sniffOnStart: configService.get(
                        'elasticsearch.sniffOnStart'
                    ),
                    tls: {
                        rejectUnauthorized: configService.get(
                            'elasticsearch.tls.rejectUnauthorized'
                        ),
                    },
                    apiVersion: configService.get('elasticsearch.apiVersion'),
                };
            },

            inject: [ConfigService],
        }),
    ],
    providers: [ElasticsearchService],
    exports: [ElasticsearchService],
})
export class ElasticsearchModule {
    static forRoot() {
        return {
            module: ElasticsearchModule,
            imports: [ConfigModule],
            global: true,
        };
    }
}
