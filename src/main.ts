import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { getQueueToken } from '@nestjs/bull';
import { QueueName } from './queue/queue.enum';
import { Queue } from 'bull';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS with specific settings
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3000/graphql'], 
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'], 
    allowedHeaders: [
      'Content-Type',
      'Accept',
      'Authorization',
      'x-apollo-operation-name',
      'apollo-require-preflight',
    ], 
    credentials: true, 
  });

  app.setGlobalPrefix('api');// Set global prefix for all REST routes

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, 
      forbidNonWhitelisted: true, 
      transform: true, 
      transformOptions: {
        enableImplicitConversion: true, 
      },
    }),
  );


  //instance for Bull Board
  const serverAdapter = new ExpressAdapter();
  serverAdapter.setBasePath('/admin/queues');
  const mailQueue = app.get<Queue>(getQueueToken(QueueName.MAIL_QUEUE));
  createBullBoard({
    queues: [new BullAdapter(mailQueue)],
    serverAdapter,
  });

  app.use('/admin/queues', serverAdapter.getRouter());

  await app.listen(3000);
  console.log(`Application is running on: http://localhost:3000`);
  console.log(`Bull Board is running on: http://localhost:3000/admin/queues`);
  console.log(`GraphQl Playground is running on: http://localhost:3000/graphql`);
}
bootstrap();


