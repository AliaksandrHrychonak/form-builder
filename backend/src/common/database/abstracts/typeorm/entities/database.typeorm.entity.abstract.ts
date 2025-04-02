import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DatabaseBaseEntityAbstract } from '@common/database/abstracts/database.base-entity.abstract';
import {
  DATABASE_CREATED_AT_FIELD_NAME,
  DATABASE_DELETED_AT_FIELD_NAME,
  DATABASE_UPDATED_AT_FIELD_NAME,
} from '@common/database/constants/database.constant';

export abstract class DatabaseTypeormEntityAbstract extends DatabaseBaseEntityAbstract<string> {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    type: 'timestamp',
  })
  [DATABASE_CREATED_AT_FIELD_NAME]?: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  [DATABASE_UPDATED_AT_FIELD_NAME]?: Date;

  @DeleteDateColumn({
    type: 'timestamp',
    nullable: true,
  })
  [DATABASE_DELETED_AT_FIELD_NAME]?: Date;
}
