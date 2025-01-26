import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

import { Employee } from '../employee/models/employee.model';
import { QueueName } from '../queue/queue.enum';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(
    @InjectQueue(QueueName.MAIL_QUEUE)
    private readonly mailQueue: Queue,
  ) {}

  async sendWelcomeEmail(employee: Employee): Promise<void> {
   

    console.log(
      `[MailService] Queuing welcome email job for employee: ${employee.name}`,
    );

    try{

      await this.mailQueue.add(
        'sendWelcomeEmail',
        {
          employee,
        },
        {
          attempts: 3, // Retry 3 times
          backoff: 5000, // Delay for 5 seconds
          removeOnComplete: true, // Remove the job from the queue when completed
          removeOnFail: false, // Do not remove the job from the queue when failed
          delay: 5000, // 5 seconds to simulate processing time
        },
      )
      this.logger.log(
        `Successfully queued email job for employee: ${employee.name}`,
      );

  } catch (error) {
    this.logger.error(
      `Failed to queue email job for employee: ${employee.name}`,
      error.stack,
    );
    throw new Error(
      `Could not queue email job for employee: ${employee.name}. Please try again later.`,
    );
  }
}
}