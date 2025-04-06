import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2';
import { AwsSESSendDto } from 'src/common/aws/dtos/aws.ses.dto';
import { IAwsSESService } from 'src/common/aws/interfaces/aws.ses-service.interface';

@Injectable()
export class AwsSESService implements IAwsSESService {
    private readonly sesClient: SESv2Client;

    constructor(private readonly configService: ConfigService) {
        this.sesClient = new SESv2Client({
            credentials: {
                accessKeyId: this.configService.get<string>(
                    'aws.ses.credential.key'
                ),
                secretAccessKey: this.configService.get<string>(
                    'aws.ses.credential.secret'
                ),
            },
            region: this.configService.get<string>('aws.ses.region'),
            endpoint: this.configService.get<string>('aws.ses.endpoint'),
        });
    }

    async send<T>({
        recipients,
        sender,
        replyTo,
        bcc,
        cc,
        content,
    }: AwsSESSendDto<T>) {
        const command = new SendEmailCommand({
            FromEmailAddress: sender,
            Destination: {
                ToAddresses: recipients,
                BccAddresses: bcc ?? [],
                CcAddresses: cc ?? [],
            },
            Content: {
                Simple: {
                    Subject: {
                        Data: content.subject,
                    },
                    Body: {
                        Html: content.htmlBody
                            ? {
                                  Data: content.htmlBody,
                              }
                            : undefined,
                        Text: content.textBody
                            ? {
                                  Data: content.textBody,
                              }
                            : undefined,
                    },
                },
            },
            ReplyToAddresses: [replyTo ?? sender],
        });

        try {
            return await this.sesClient.send(command);
        } catch (err: any) {
            throw err;
        }
    }
}
