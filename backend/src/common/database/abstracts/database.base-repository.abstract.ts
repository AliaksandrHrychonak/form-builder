import { DeepPartial, QueryRunner } from 'typeorm';

export abstract class DatabaseBaseRepositoryAbstract<Entity> {
  abstract create<Dto extends DeepPartial<Entity>>(
    data: Dto,
    queryRunner?: QueryRunner,
  ): Promise<Entity>;
}
