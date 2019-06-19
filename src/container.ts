import { GraphQLModule } from '@graphql-modules/core';
import { ApplicationModule } from '@modules/application-module';
import 'reflect-metadata';

const Container = new GraphQLModule({
  imports: [ApplicationModule],
});

export { Container };
