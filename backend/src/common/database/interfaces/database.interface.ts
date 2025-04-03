import { FindOptionsRelations, FindOptionsSelect } from 'typeorm';

export interface IBaseRepositoryOptions {
    select?: FindOptionsSelect<any>;
    relations?: FindOptionsRelations<any>;
    withDeleted?: boolean;
}
