import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DATABASE_CONNECTION_NAME } from '@common/database/constants/database.constant';

export function DatabaseConnection(
  connectionName?: string,
): ParameterDecorator {
  return InjectDataSource(connectionName ?? DATABASE_CONNECTION_NAME);
}

export function DatabaseModel(
  entity: any,
  connectionName?: string,
): ParameterDecorator {
  return InjectRepository(entity, connectionName ?? DATABASE_CONNECTION_NAME);
}

export function DatabaseEntity(): ClassDecorator {
  return (): void => {
    // This decorator can be used for additional entity configuration
  };
}
