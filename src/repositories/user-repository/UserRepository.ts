import { Inject, Injectable } from '@graphql-modules/di';
import { TableQuery, TableService } from 'azure-storage';
import { User } from './User';

export interface IUserRepository {
  tableName: string;
  save(user: User): Promise<void>;
  find(): Promise<User[]>;
}

@Injectable()
class UserRepository implements IUserRepository {
  public tableName: string = 'userentity';

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

  public async save(user: User): Promise<void> {
    return new Promise((resolve, reject) => {
      this.tableService.insertEntity<User>(
        this.tableName,
        user,
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

  // @TODO: Add filters as a parameter, for now we are just returning
  // all users, but ideally we should use the filters we have in the alpha site
  public async find(/* filters: object */): Promise<User[]> {
    return new Promise((resolve, reject) => {
      const query = new TableQuery();
      this.tableService.queryEntities<User>(
        this.tableName,
        query,
        null,
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result.entries);
          }
        },
      );
    });
  }
}

export { UserRepository };
