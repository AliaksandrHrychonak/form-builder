import { registerAs } from '@nestjs/config';
import { ENUM_APP_ENVIRONMENT } from '../app/constants/app.enum.constant';

export default registerAs(
    'elasticsearch',
    (): Record<string, any> => ({
        node: process.env.ELASTICSEARCH_NODE ?? 'http://localhost:9200',
        auth: {
            username: process.env.ELASTICSEARCH_USERNAME ?? 'elastic',
            password: process.env.ELASTICSEARCH_PASSWORD ?? 'changeme',
        },
        maxRetries: parseInt(process.env.ELASTICSEARCH_MAX_RETRIES ?? '3', 10),
        requestTimeout: parseInt(
            process.env.ELASTICSEARCH_REQUEST_TIMEOUT ?? '30000',
            10
        ),
        sniffOnStart: process.env.ELASTICSEARCH_SNIFF_ON_START === 'true',
        tls: {
            rejectUnauthorized:
                process.env.APP_ENV === ENUM_APP_ENVIRONMENT.PRODUCTION,
        },
        apiVersion: '8.x',
    })
);
