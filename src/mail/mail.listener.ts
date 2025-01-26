import { Injectable } from "@nestjs/common";
import { MailService } from "./mail.service";
import { OnEvent } from "@nestjs/event-emitter";
import { Employee } from "../employee/models/employee.model";


@Injectable()
export class MailListener {
  constructor( private readonly mailService: MailService) {
    // console.log('MailListener constructor initialized.');
  }


  @OnEvent('employee.created')
async handleEmployeeCreated(employee: Employee) {
  console.log(`[MailListener] Employee created event received: ${employee.name}`);
  await this.mailService.sendWelcomeEmail(employee); // Add job to queue
  
}
}