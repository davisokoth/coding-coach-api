import { AzureFunction } from '@azure/functions';
import { Container } from '@container';
import 'reflect-metadata';
import { GetMentor } from './get-mentor-handler';

const index: AzureFunction = Container.injector.get<GetMentor>(GetMentor).index;
export { index };
