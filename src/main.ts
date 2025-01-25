

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ExpressAdapter } from '@bull-board/express';
import * as express from 'express';
import { QueueName } from './queue/queue.enum';
import { getQueueToken } from '@nestjs/bull';
import { Queue } from 'bull';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Create Express instance for Bull Board
  const serverAdapter = new ExpressAdapter();
  serverAdapter.setBasePath('/admin/queues');

  // Get the Bull queue
  const mailQueue = app.get<Queue>(getQueueToken(QueueName.MAIL_QUEUE));

  // Setup Bull Board
  createBullBoard({
    queues: [new BullAdapter(mailQueue)],
    serverAdapter,
  });

  app.use('/admin/queues', serverAdapter.getRouter());

  await app.listen(3000);
  console.log(`Application is running on: http://localhost:3000`);
  console.log(`Bull Board is running on: http://localhost:3000/admin/queues`);
}
bootstrap();
