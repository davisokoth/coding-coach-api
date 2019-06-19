import { Inject, Injectable } from '@graphql-modules/di';
import { TableQuery, TableService } from 'azure-storage';
import { MenteeEntity } from './mentee-entity';

export interface IMenteeRepository {
  tableName: string;
  addMentor(mentee: MenteeEntity): Promise<void>;
  getMentor(menteeId: string): Promise<MenteeEntity>;
}

@Injectable()
class MenteeRepository implements IMenteeRepository {
  public tableName: string = 'menteeentity';
  constructor(@Inject('TableService') private tableService: TableService) {
    this.tableService.doesTableExist(this.tableName, (error, result) => {
      if (!result.exists) {
        this.tableService.createTable(this.tableName, (createError, createResult) => {
          console.log(createError);
          console.log(createResult);
        });
      }
    });
  }
  public addMentor(mentee: MenteeEntity): Promise<void> {
    return new Promise((resolve, reject) => {
      this.tableService.insertEntity<MenteeEntity>(
        this.tableName,
        mentee,
        (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        },
      );
    });
  }
  public getMentor(menteeId: string): Promise<MenteeEntity> {
    return new Promise((resolve, reject) => {
      const query = new TableQuery()
        .top(1)
        .where('PartitionKey eq ?', menteeId);
      this.tableService.queryEntities<MenteeEntity>(
        this.tableName,
        query,
        null,
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            const entity = result.entries[0];
            resolve(entity);
          }
        },
      );
    });
  }
}

export { MenteeRepository };
