import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import configs from '../config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseOptionsService } from '@common/database/services/database.options.service';

@Module({
  controllers: [],
  imports: [
    ConfigModule.forRoot({
      load: configs,
      isGlobal: true,
      cache: true,
      envFilePath: ['.env'],
      expandVariables: true,
      // TODO validationSchema
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseOptionsService,
      inject: [ConfigService],
    }),
  ],
})
export class CommonModule {}
