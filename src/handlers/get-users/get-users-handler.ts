import 'reflect-metadata';
import { Context } from '@azure/functions';
import { Inject, Injectable } from '@graphql-modules/di';
import { IUserRepository } from '@repositories/user-repository';

@Injectable()
class GetUsers {
  constructor(@Inject('IUserRepository') private userRepository: IUserRepository) {
    // Nothing to do here
  }

  public index = async (context: Context): Promise<void> => {

    // @TODO: Add filters
    const users = await this.userRepository.find();

    context.res = {
      body: {
        success: true,
        users,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }
}

export { GetUsers };
