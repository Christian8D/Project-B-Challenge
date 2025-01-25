import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Patch,
    Delete,
  } from '@nestjs/common';
  import { EmployeeService } from './employee.service';
  import { CreateEmployeeInput } from './dtos/create-employee.input';
  import { Employee } from './models/employee.model';


// Controllet no longer needs to inject MailService
@Controller('employees')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) {}

    @Post()
    createEmployee(@Body() dto: CreateEmployeeInput): Employee {
        return this.employeeService.createEmployee(dto);
    }

    @Get(':id')
    getEmployee(@Param('id') id: string): Employee {
        return this.employeeService.getEmployeeById(id);
    }

    @Get()
    getEmployees(): Employee[] {
        return this.employeeService.getAllEmployees();
    }

    @Patch(':id')
    updateEmployee(
        @Param('id') id: string,
        @Body() body: Partial<Pick<Employee, 'jobTitle' | 'department' | 'email'>>
    ): Employee {
        return this.employeeService.updateEmployee(id, body);
    }

    @Delete(':id')
    deleteEmployee(@Param('id') id: string): void {
        return this.employeeService.deleteEmployee(id);
    }
}

