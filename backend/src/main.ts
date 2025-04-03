import { NestApplication, NestFactory } from '@nestjs/core';
import { Logger, VersioningType } from '@nestjs/common';
import { AppModule } from 'src/app/app.module';
import { ConfigService } from '@nestjs/config';
import { useContainer } from 'class-validator';

async function bootstrap() {
    const app: NestApplication = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    const databaseHost = configService.get('database.host') as string;
    const databasePort = configService.get('database.port') as string;
    const env = configService.get('app.env') as string;
    const host = configService.get('app.http.host') as string;
    const port = configService.get('app.http.port') as number;
    const globalPrefix = configService.get('app.globalPrefix') as string;
    const versioningPrefix = configService.get('app.versioning.prefix') as string;
    const version = configService.get('app.versioning.version') as string;

    const httpEnable = configService.get('app.http.enable') as boolean;
    const versionEnable = configService.get('app.versioning.enable') as string;

    const logger = new Logger();
    process.env.NODE_ENV = env;

    // Global
    app.setGlobalPrefix(globalPrefix);

    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    // Versioning
    if (versionEnable) {
        app.enableVersioning({
            type: VersioningType.URI,
            defaultVersion: version,
            prefix: versioningPrefix,
        });
    }

    // Listen
    await app.listen(port, host);

    logger.log(`==========================================================`);

    logger.log(`Environment Variable`, 'NestApplication');
    logger.log(JSON.parse(JSON.stringify(process.env)), 'NestApplication');

    logger.log(`==========================================================`);

    logger.log(
        `Http is ${httpEnable}, ${httpEnable ? 'routes registered' : 'no routes registered'}`,
        'NestApplication'
    );
    logger.log(`Http versioning is ${versionEnable}`, 'NestApplication');

    logger.log(`Http Server running on ${await app.getUrl()}`, 'NestApplication');
    logger.log(`Database host ${databaseHost}`, 'NestApplication');
    logger.log(`Database port ${databasePort}`, 'NestApplication');

    logger.log(`==========================================================`);
}

bootstrap();
