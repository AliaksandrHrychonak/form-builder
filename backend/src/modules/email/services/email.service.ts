import { Injectable } from '@nestjs/common';
import { AwsSESService } from 'src/common/aws/services/aws.ses.service';
import { ENUM_EMAIL } from 'src/modules/email/constants/email.enum.constant';
import { title } from 'case';
import { ConfigService } from '@nestjs/config';
import { IEmailService } from 'src/modules/email/interfaces/email.service.interface';

import { EmailSendDto } from 'src/modules/email/dtos/email.send.dto';
import { EMAIL_TEMPLATES } from '../templates/email.templates';

@Injectable()
export class EmailService implements IEmailService {
    private readonly fromEmail: string;

    constructor(
        private readonly awsSESService: AwsSESService,
        private readonly configService: ConfigService
    ) {
        this.fromEmail = this.configService.get<string>('email.fromEmail');
    }

    async sendChangePassword({ name, email }: EmailSendDto): Promise<boolean> {
        try {
            const template = EMAIL_TEMPLATES[ENUM_EMAIL.CHANGE_PASSWORD];
            await this.awsSESService.send({
                templateName: ENUM_EMAIL.CHANGE_PASSWORD,
                recipients: [email],
                sender: this.fromEmail,
                content: {
                    subject: template.subject,
                    htmlBody: template.html({ name: title(name) }),
                    textBody: template.text({ name: title(name) }),
                },
            });

            return true;
        } catch (err: unknown) {
            return false;
        }
    }

    async sendSignUp({ name, email }: EmailSendDto): Promise<boolean> {
        try {
            const template = EMAIL_TEMPLATES[ENUM_EMAIL.WElCOME];
            await this.awsSESService.send({
                templateName: ENUM_EMAIL.WElCOME,
                recipients: [email],
                sender: this.fromEmail,
                content: {
                    subject: template.subject,
                    htmlBody: template.html({ name: title(name) }),
                    textBody: template.text({ name: title(name) }),
                },
            });

            return true;
        } catch (err: unknown) {
            return false;
        }
    }
}
