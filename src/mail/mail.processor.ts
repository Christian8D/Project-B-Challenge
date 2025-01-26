import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { QueueName } from '../queue/queue.enum';
import * as nodemailer from 'nodemailer';


@Processor(QueueName.MAIL_QUEUE)
export class MailProcessor {
  @Process('sendWelcomeEmail')
  async handleSendWelcomeEmail(job: Job) {
    const { employee } = job.data;

    console.log(`[MailProcessor] Processing job #${job.id} for ${employee.name}`);

    // Simulate "sending" the email
    console.log(`[MailProcessor] Simulating email send to ${employee.name}...`);

    // SMTP configuration for nodemailer
    // const transporter = nodemailer.createTransport({
    //     host: 'smtp.example.com',
    //     port: 587,
    //     secure: false,
    //     auth: {
    //       user: 'YOUR_SMTP_USER',
    //       pass: 'YOUR_SMTP_PASS',
    //     },
    //   });

    // const mailOptions = {
    //     from: '"HR Dept" <hr@example.com>',
    //     to: `some_test_email@domain.com`,
    //     subject: 'Welcome to the Company',
    //     text: `Hello ${employee.name}, welcome to our company!`,
    //   };

      try {
        // await transporter.sendMail(mailOptions);
        console.log(
          `[MailProcessor] Email (job #${job.id}) "sent" successfully to ${employee.name}`,
        );
      } catch (error) {
        console.error(`[MailProcessor] Error sending email for job #${job.id}`, error);
        throw error;
    }

    return{
      success: true, 
      message: `Email sent successfully to ${employee.email}`,
    }

 }
}