import { AzureFunction } from '@azure/functions';
import { Container } from '@container';
import 'reflect-metadata';
import { GetMentees } from './get-mentees-handler';

const index: AzureFunction = Container.injector.get<GetMentees>(GetMentees)
  .index;
export { index };
