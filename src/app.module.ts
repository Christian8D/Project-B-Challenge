
// app.module.ts

import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { BullModule } from '@nestjs/bull';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { LoggerMiddleware } from './logger.middleware'; 
import { join } from 'path';

import { bullConfig } from './queue/bull.config';
import { EmployeeModule } from './employee/employee.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(), 
    BullModule.forRoot(bullConfig), 
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // autoSchemaFile: join(process.cwd(), 'src/schema.gql'), //TODO: Remove after debugging Generate schema file
      autoSchemaFile: true,
      playground: true,
      csrfPrevention: true, 
      context: ({ req, res }) => {
        console.log('Request Context:', { body: req.body, headers: req.headers });
        return { req, res };
      },
    }),
    EmployeeModule, 
    MailModule, 
  ],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware) 
      .forRoutes('*'); 
  }
}

