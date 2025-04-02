import {
  DeepPartial,
  FindOptionsRelations,
  ObjectLiteral,
  QueryRunner,
  Repository,
} from 'typeorm';
import { DatabaseBaseRepositoryAbstract } from '@common/database/abstracts/database.base-repository.abstract';

export class DatabaseTypeormRepositoryAbstract<
  Entity extends ObjectLiteral,
  EntityDocument extends Entity,
> extends DatabaseBaseRepositoryAbstract<EntityDocument> {
  protected readonly _repository: Repository<Entity>;
  protected readonly relations?: FindOptionsRelations<Entity>;

  constructor(repository: Repository<Entity>) {
    super();
    this._repository = repository;
  }

  async create<Dto extends DeepPartial<EntityDocument>>(
    data: Dto,
    queryRunner?: QueryRunner,
  ): Promise<EntityDocument> {
    const entity = this._repository.create(data as DeepPartial<Entity>);

    if (queryRunner) {
      return queryRunner.manager.save(entity) as Promise<EntityDocument>;
    }

    return this._repository.save(entity) as Promise<EntityDocument>;
  }
}
