import { GraphQLModule } from '@graphql-modules/core';
import { AddMentee } from '@handlers/add-mentee/add-mentee-handler';
import { AddUser } from '@handlers/add-user/add-user-handler';
import { GetMentees } from '@handlers/get-mentees/get-mentees-handler';
import { GetMentor } from '@handlers/get-mentor/get-mentor-handler';
import { GetUsers } from '@handlers/get-users/get-users-handler';
import 'reflect-metadata';
import { BoundaryModule } from './boundary-module';

const ApplicationModule = new GraphQLModule({
  imports: [BoundaryModule],
  providers: [AddMentee, AddUser, GetMentees, GetMentor, GetUsers],
});

export { ApplicationModule };
