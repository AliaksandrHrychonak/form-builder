import { Module } from '@nestjs/common';
import { AuthModule } from 'src/common/auth/auth.module';
import { AwsModule } from 'src/common/aws/aws.module';
import { SettingModule } from 'src/modules/setting/setting.module';
import { UserUserController } from 'src/modules/user/controllers/user.user.controller';
import { UserModule } from 'src/modules/user/user.module';
import { TemplateModule } from '../../modules/template/template.module';
import { TemplateUserController } from '../../modules/template/controllers/template.user.controller';
import { PaginationModule } from '../../common/pagination/pagination.module';

@Module({
    controllers: [UserUserController, TemplateUserController],
    providers: [],
    exports: [],
    imports: [
        UserModule,
        AuthModule,
        AwsModule,
        SettingModule,
        TemplateModule,
        PaginationModule,
    ],
})
export class RoutesUserModule {}
