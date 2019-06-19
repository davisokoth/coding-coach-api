import { AzureFunction } from '@azure/functions';
import { Container } from '@container';
import 'reflect-metadata';
import { GetUsers } from './get-users-handler';

const index: AzureFunction = Container.injector.get(GetUsers).index;

export { index };
