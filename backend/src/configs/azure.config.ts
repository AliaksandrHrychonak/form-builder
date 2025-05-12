import { registerAs } from '@nestjs/config';
import * as process from 'node:process';

export default registerAs(
    'azure',
    (): Record<string, any> => ({
        tenantId: process.env.AZURE_TENANT_ID,
        clientId: process.env.AZURE_CLIENT_ID,
        clientSecret: process.env.AZURE_CLIENT_SECRET,
        graphApi: {
            url:
                process.env.AZURE_GRAPH_API_URL ||
                'https://graph.microsoft.com/.default',
        },

        onedrive: {
            supportFolder:
                process.env.ONEDRIVE_SUPPORT_FOLDER || 'support-tickets',
        },
    })
);
