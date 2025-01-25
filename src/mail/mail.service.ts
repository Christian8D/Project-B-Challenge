import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

import { Employee } from '../employee/models/employee.model';
import { QueueName } from '../queue/queue.enum';

@Injectable()
export class MailService {
  constructor(
    @InjectQueue(QueueName.MAIL_QUEUE)
    private readonly mailQueue: Queue,
  ) {}

  async sendWelcomeEmail(employee: Employee) {

    console.log(
      `[MailService] Queuing welcome email job for employee: ${employee.name}`,
    );
    
    // Add a job to the queue
    await this.mailQueue.add('sendWelcomeEmail', {
      employee,
    });
  }
}
