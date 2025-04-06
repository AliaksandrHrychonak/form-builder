import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { ApiKeyService } from 'src/common/api-key/services/api-key.service';
import { ENUM_API_KEY_TYPE } from 'src/common/api-key/constants/api-key.enum.constant';
import * as process from 'node:process';

@Injectable()
export class MigrationApiKeySeed {
    constructor(private readonly apiKeyService: ApiKeyService) {}

    @Command({
        command: 'seed:apikey',
        describe: 'seeds apikeys',
    })
    async seeds(): Promise<void> {
        try {
            await this.apiKeyService.createRaw({
                name: 'Api Key Public Migration',
                type: ENUM_API_KEY_TYPE.PUBLIC,
                key: process.env.SEED_APIKEY_PUBLIC,
                secret: process.env.SEED_APIKEY_PUBLIC_SECRET,
            });

            await this.apiKeyService.createRaw({
                name: 'Api Key Private Migration',
                type: ENUM_API_KEY_TYPE.PRIVATE,
                key: process.env.SEED_APIKEY_PRIVATE,
                secret: process.env.SEED_APIKEY_PRIVATE_SECRET,
            });
        } catch (err: any) {
            throw new Error(err.message);
        }

        return;
    }

    @Command({
        command: 'remove:apikey',
        describe: 'remove apikeys',
    })
    async remove(): Promise<void> {
        try {
            await this.apiKeyService.deleteMany({});
        } catch (err: any) {
            throw new Error(err.message);
        }

        return;
    }
}
