import { Module, OnModuleInit } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailProcessor } from './mail.processor';
import { BullModule, InjectQueue } from '@nestjs/bull';
import { QueueName } from '../queue/queue.enum';
import { Queue } from 'bull';
import { MailListener } from './mail.listener';

@Module({
  imports: [
    // Register the queue
    BullModule.registerQueue({
      name: QueueName.MAIL_QUEUE,
    }),
  ],
  providers: [MailService, MailProcessor, MailListener],
  exports: [MailService],
})

export class MailModule implements OnModuleInit {
  constructor(@InjectQueue(QueueName.MAIL_QUEUE) private mailQueue: Queue) {}

  onModuleInit(){
    
    // Log when any job is completed
    this.mailQueue.on('completed', (job, result) => {
      console.log(`[MailQueue] Job #${job.id} completed. Result: ${JSON.stringify(result)}`,);
    });

    this.mailQueue.on('failed', (job, error) => {
      console.error(`[MailQueue] Job #${job.id} failed. Error: ${error.message}`,);
    });
    
  }


}
