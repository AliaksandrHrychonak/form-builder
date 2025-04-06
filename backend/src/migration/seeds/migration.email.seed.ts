import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { EmailService } from 'src/modules/email/services/email.service';

// TODO add create template
@Injectable()
export class MigrationEmailSeed {
    constructor(private readonly emailService: EmailService) {}

    @Command({
        command: 'seed:email',
        describe: 'seeds emails',
    })
    async seeds(): Promise<void> {
        return;
    }

    @Command({
        command: 'remove:email',
        describe: 'remove emails',
    })
    async remove(): Promise<void> {
        return;
    }
}
