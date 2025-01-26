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

    //TODO: Implement email sending logic here

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

    const mailOptions = {
        from: '"HR Dept" <hr@example.com>',
        to: `${employee.email}`,
        subject: 'Welcome to the Company',
        text: `Hello ${employee.name}, welcome to project b! Are you ready to unf*ck payroll?`,
      };

      console.log(`[MailProcessor] After simulation Data Sent: ${JSON.stringify(mailOptions)}...`);
     

      try {
        //TODO: - email logic: await transporter.sendMail(mailOptions);
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