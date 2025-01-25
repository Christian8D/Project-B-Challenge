// app.module.ts
import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { BullModule } from '@nestjs/bull';
import { ApolloDriver, ApolloDriverConfig} from '@nestjs/apollo';

import { bullConfig } from './queue/bull.config';  // your existing Bull config
import { EmployeeModule } from './employee/employee.module';
import { MailModule } from './mail/mail.module';
import { GraphQLModule } from '@nestjs/graphql';


@Module({
  imports: [
    EventEmitterModule.forRoot(),         // <--- Enable event emitter
    BullModule.forRoot(bullConfig),       // <--- Bull/Redis config
    
  GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: true,
    playground: true,
  }),
    EmployeeModule,
    MailModule,
  ],
})
export class AppModule {}
