// src/mail/mail.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from '../src/mail/mail.service';
import { getQueueToken } from '@nestjs/bull';
import { Queue } from 'bull';
import { QueueName } from '../src/queue/queue.enum';
import { Employee } from '../src/employee/models/employee.model';

describe('MailService', () => {
  let mailService: MailService;
  let mockQueue: Partial<Queue>;

  beforeEach(async () => {
    mockQueue = {
      add: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailService,
        {
          provide: getQueueToken(QueueName.MAIL_QUEUE),
          useValue: mockQueue,
        },
      ],
    }).compile();

    mailService = module.get<MailService>(MailService);
  });

  it('should be defined', () => {
    expect(mailService).toBeDefined();
  });

  it('should add a sendWelcomeEmail job to the queue', async () => {
    const employee: Employee = {
      id: '123',
      name: 'Christian Cosio',
      email: 'Hire@ChristianC.dev',
      jobTitle: 'Software Engineer',
      department: 'IT',
    };

    await mailService.sendWelcomeEmail(employee);
    expect(mockQueue.add).toHaveBeenCalledWith(
      'sendWelcomeEmail',
      { employee },
      expect.anything(), // If you have job options
    );
  });
});
