import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { ENUM_APP_ENVIRONMENT } from '@app/app/constants/app.enum.constant';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { IDatabaseOptionsService } from '@common/database/interfaces/database.options-service.interface';

@Injectable()
export class DatabaseOptionsService implements IDatabaseOptionsService {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const env = this.configService.get<string>('app.env');
    const host = this.configService.get<string>('database.host');
    const port = this.configService.get<number>('database.port');
    const database = this.configService.get<string>('database.name');
    const username = this.configService.get<string>('database.user');
    const password = this.configService.get<string>('database.password');
    const debug = this.configService.get<boolean>('database.debug');

    return {
      type: 'postgres',
      host,
      port,
      username,
      password,
      database,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: env !== ENUM_APP_ENVIRONMENT.PRODUCTION,
      logging: debug,
      autoLoadEntities: true,
      namingStrategy: new SnakeNamingStrategy(),
      ssl: env === ENUM_APP_ENVIRONMENT.PRODUCTION,
      extra: {
        max: 20,
        connectionTimeoutMillis: 5000,
      },
    };
  }
}
