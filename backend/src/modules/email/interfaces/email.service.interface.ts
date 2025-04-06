import { EmailSendDto } from 'src/modules/email/dtos/email.send.dto';

export interface IEmailService {
    sendChangePassword({ name, email }: EmailSendDto): Promise<boolean>;
    sendSignUp({ name, email }: EmailSendDto): Promise<boolean>;
}
