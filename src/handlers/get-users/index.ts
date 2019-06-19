import 'reflect-metadata';
import { AzureFunction } from '@azure/functions';
import { Container } from '@container';
import { GetUsers } from './get-users-handler';

const index: AzureFunction = Container.injector.get(GetUsers).index;

export { index };
