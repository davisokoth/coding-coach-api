import { AzureFunction } from '@azure/functions';
import { Container } from '@container';
import 'reflect-metadata';
import { AddUser } from './add-user-handler';

const index: AzureFunction = Container.injector.get(AddUser).index;

export { index };
