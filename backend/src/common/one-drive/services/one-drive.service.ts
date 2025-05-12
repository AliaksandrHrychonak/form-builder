import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IOneDriveService } from '../interfaces/one-drive.service.interface';
import {
    AuthenticationProvider,
    Client,
} from '@microsoft/microsoft-graph-client';
import { ConfidentialClientApplication } from '@azure/msal-node';

@Injectable()
export class OneDriveService implements IOneDriveService {
    private graphClient: Client;
    private readonly folderPath: string;

    constructor(private readonly configService: ConfigService) {
        const clientConfig = {
            auth: {
                clientId: this.configService.get('AZURE_CLIENT_ID'),
                clientSecret: this.configService.get('AZURE_CLIENT_SECRET'),
                authority: `https://login.microsoftonline.com/${this.configService.get('AZURE_TENANT_ID')}`,
            },
        };

        const authProvider: AuthenticationProvider = {
            getAccessToken: async (): Promise<string> => {
                try {
                    const client = new ConfidentialClientApplication(
                        clientConfig
                    );
                    const response =
                        await client.acquireTokenByClientCredential({
                            scopes: ['https://graph.microsoft.com/.default'],
                        });

                    if (!response?.accessToken) {
                        throw new Error('Failed to acquire access token');
                    }

                    return response.accessToken;
                } catch (error) {
                    console.error('Auth error:', error);
                    throw new Error(`Authentication failed: ${error.message}`);
                }
            },
        };

        this.graphClient = Client.initWithMiddleware({
            authProvider: authProvider,
        });

        this.folderPath = this.configService.get('ONEDRIVE_FOLDER_PATH', '');
    }

    async uploadFile(fileName: string, content: Buffer): Promise<string> {
        try {
            const uploadSession = await this.graphClient
                .api(
                    `/drive/root:/${this.folderPath}/${fileName}:/createUploadSession`
                )
                .post({});

            const maxChunkSize = 320 * 1024; // 320KB chunks
            const fileSize = content.length;
            const chunks = Math.ceil(fileSize / maxChunkSize);

            let uploadedFile;

            // Для маленьких файлов используем прямую загрузку
            if (fileSize <= maxChunkSize) {
                uploadedFile = await this.graphClient
                    .api(`/drive/root:/${this.folderPath}/${fileName}:/content`)
                    .put(content);
            } else {
                // Для больших файлов используем загрузку по частям
                for (let i = 0; i < chunks; i++) {
                    const start = i * maxChunkSize;
                    const end = Math.min(start + maxChunkSize, fileSize);
                    const chunk = content.slice(start, end);

                    const response = await fetch(uploadSession.uploadUrl, {
                        method: 'PUT',
                        headers: {
                            'Content-Length': `${chunk.length}`,
                            'Content-Range': `bytes ${start}-${end - 1}/${fileSize}`,
                        },
                        body: chunk,
                    });

                    if (!response.ok) {
                        throw new Error(
                            `Chunk upload failed: ${response.statusText}`
                        );
                    }

                    if (i === chunks - 1) {
                        uploadedFile = await response.json();
                    }
                }
            }

            return uploadedFile.id;
        } catch (error) {
            console.error('Upload error:', error);
            throw new Error(`Failed to upload file: ${error.message}`);
        }
    }

    async getFileUrl(fileId: string): Promise<string> {
        try {
            const shareLink = await this.graphClient
                .api(`/drive/items/${fileId}/createLink`)
                .post({
                    type: 'view',
                    scope: 'organization',
                });

            if (!shareLink?.link?.webUrl) {
                throw new Error('Failed to generate sharing link');
            }

            return shareLink.link.webUrl;
        } catch (error) {
            console.error('Share link error:', error);
            throw new Error(`Failed to get file URL: ${error.message}`);
        }
    }
}
