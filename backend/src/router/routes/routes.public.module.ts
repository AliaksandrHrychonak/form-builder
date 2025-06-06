import { Module } from '@nestjs/common';
import { AuthModule } from 'src/common/auth/auth.module';
import { EmailModule } from 'src/modules/email/email.module';
import { HelloPublicController } from 'src/modules/hello/controllers/hello.public.controller';
import { RoleModule } from 'src/modules/role/role.module';
import { SettingPublicController } from 'src/modules/setting/controllers/setting.public.controller';
import { SettingModule } from 'src/modules/setting/setting.module';
import { UserPublicController } from 'src/modules/user/controllers/user.public.controller';
import { UserModule } from 'src/modules/user/user.module';
import { TemplateModule } from '../../modules/template/template.module';
import { TemplatePublicController } from '../../modules/template/controllers/template.public.controller';
import { PaginationModule } from '../../common/pagination/pagination.module';
import { TemplateTagPublicController } from '../../modules/template/controllers/template-tag.public.controller';
import { SupportPublicController } from '../../modules/support/controllers/support.public.controller';
import { SupportModule } from '../../modules/support/support.module';

@Module({
    controllers: [
        HelloPublicController,
        SettingPublicController,
        UserPublicController,
        TemplatePublicController,
        TemplateTagPublicController,
        SupportPublicController,
    ],
    providers: [],
    exports: [],
    imports: [
        SettingModule,
        UserModule,
        AuthModule,
        RoleModule,
        EmailModule,
        TemplateModule,
        PaginationModule,
        SupportModule,
    ],
})
export class RoutesPublicModule {}
