import { Context, HttpRequest } from '@azure/functions';
import { Inject, Injectable } from '@graphql-modules/di';
import { IMentorRepository } from '@repositories/mentor-repository/mentor-repository';
import 'reflect-metadata';

@Injectable()
class GetMentees {
  constructor(
    @Inject('IMentorRepository') private mentorRepository: IMentorRepository,
  ) {}
  public index = async (context: Context, req: HttpRequest): Promise<void> => {
    context.log('JavaScript HTTP trigger function processed a request.');
    const mentorId = req.query.mentorId;
    const mentees = await this.mentorRepository.getMentees(mentorId);

    context.res = {
      body: JSON.stringify(mentees),
      status: '200',
    };
  }
}

export { GetMentees };
