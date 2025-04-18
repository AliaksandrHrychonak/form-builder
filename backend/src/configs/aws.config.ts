import { registerAs } from '@nestjs/config';
import * as process from 'node:process';

export default registerAs(
    'aws',
    (): Record<string, any> => ({
        s3: {
            credential: {
                key: process.env.AWS_S3_CREDENTIAL_KEY,
                secret: process.env.AWS_S3_CREDENTIAL_SECRET,
            },
            bucket: process.env.AWS_S3_BUCKET ?? 'bucket',
            region: process.env.AWS_S3_REGION,
            // baseUrl: `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_S3_REGION}.amazonaws.com`,
            baseUrl: process.env.AWS_S3_ENDPOINT,
            endpoint: process.env.AWS_S3_ENDPOINT,
        },
        ses: {
            credential: {
                key: process.env.AWS_SES_CREDENTIAL_KEY,
                secret: process.env.AWS_SES_CREDENTIAL_SECRET,
            },
            region: process.env.AWS_SES_REGION,
            endpoint: process.env.AWS_SES_ENDPOINT,
        },
    })
);
