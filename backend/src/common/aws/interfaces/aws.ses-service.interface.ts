import { SendEmailCommandOutput } from '@aws-sdk/client-sesv2';
import { AwsSESSendDto } from 'src/common/aws/dtos/aws.ses.dto';

export interface IAwsSESService {
    send<T>({
        recipients,
        sender,
        replyTo,
        bcc,
        cc,
        templateName,
        templateData,
    }: AwsSESSendDto<T>): Promise<SendEmailCommandOutput>;
}
