import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { MailModule } from '../mail/mail.module';
import { EmployeeResolver } from './employee.resolver';


@Module({
  imports: [MailModule],
  controllers: [EmployeeController],
  providers: [EmployeeService, EmployeeResolver],
})
export class EmployeeModule {}
