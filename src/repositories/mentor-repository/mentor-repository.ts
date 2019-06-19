import { Inject, Injectable } from '@graphql-modules/di';
import { TableQuery, TableService } from 'azure-storage';
import { MentorEntity } from './mentor-entity';

export interface IMentorRepository {
  tableName: string;
  getMentees(mentorId: string): Promise<MentorEntity[]>;
  addMentee(mentor: MentorEntity): Promise<void>;
}

@Injectable()
class MentorRepository implements IMentorRepository {
  public tableName: string = 'mentorentity';

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

  public async getMentees(mentorId: string): Promise<MentorEntity[]> {
    return new Promise((resolve, reject) => {
      const query = new TableQuery().where('PartitionKey eq ?', mentorId);
      this.tableService.queryEntities<MentorEntity>(
        this.tableName,
        query,
        null,
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            const entities = result.entries;
            resolve(entities);
          }
        },
      );
    });
  }

  public async addMentee(mentor: MentorEntity): Promise<void> {
    return new Promise((resolve, reject) => {
      this.tableService.insertEntity<MentorEntity>(
        this.tableName,
        mentor,
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
}

export { MentorRepository };
