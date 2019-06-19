import 'reflect-metadata';
import { Context, HttpRequest } from '@azure/functions';
import { Inject, Injectable } from '@graphql-modules/di';
import { IMenteeRepository } from '@repositories/mentee-repository';

@Injectable()
class GetMentor {
  constructor(
    @Inject('IMenteeRepository') private menteeRepository: IMenteeRepository,
  ) {}
  public index = async (context: Context, req: HttpRequest): Promise<void> => {
    context.log('JavaScript HTTP trigger function processed a request.');
    const menteeId = req.query.menteeId;
    const mentees = await this.menteeRepository.getMentor(menteeId);

    context.res = {
      body: JSON.stringify(mentees),
      status: '200',
    };
  }
}

export { GetMentor };
