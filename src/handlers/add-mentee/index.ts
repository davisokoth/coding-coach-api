import { AzureFunction } from '@azure/functions';
import { Container } from '@container';
import 'reflect-metadata';
import { AddMentee } from './add-mentee-handler';

const index: AzureFunction = Container.injector.get(AddMentee).index;
export { index };
