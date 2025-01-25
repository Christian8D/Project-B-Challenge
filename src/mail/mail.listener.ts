import { Injectable } from "@nestjs/common";
import { MailService } from "./mail.service";
import { OnEvent } from "@nestjs/event-emitter";
import { Employee } from "../employee/models/employee.model";


@Injectable()
export class MailListener {
  constructor( private readonly mailMailService: MailService) {
    console.log('MailListener constructor initialized.');
  }

  @OnEvent('employee.created')
  handleEmployeeCreated(employee: Employee ) {
    console.log(`[MailListener] Received "employee.created" event for: ${employee.name}`);
    // Add a job to the mail queue. (Asynchronous)
    this.mailMailService.sendWelcomeEmail(employee);
  }
}