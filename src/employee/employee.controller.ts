import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Patch,
    Delete,
  } from '@nestjs/common';
  // import { Throttle, SkipThrottle} from '@nestjs/throttler';
  import { EmployeeService } from './employee.service';
  import { CreateEmployeeInput } from './dtos/create-employee.input';
  import { Employee } from './models/employee.model';
  import { PartialType } from '@nestjs/mapped-types';




  // Partial DTO for updating employees
  export class UpdateEmployeeInput extends PartialType(CreateEmployeeInput) {}
  
  // Controller
  // @SkipThrottle()
  @Controller('employees')
  export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) {}
  
    @Post()
    // @Throttle({write: {ttl: 1000, limit: 5}})
    createEmployee(@Body() dto: CreateEmployeeInput): Promise<Employee> {
      return this.employeeService.createEmployee(dto);
    }
  
    @Get(':id')
    // @Throttle({read: {ttl: 1000, limit: 10}})
    getEmployee(@Param('id') id: string): Promise<Employee> {
      return this.employeeService.getEmployeeById(id);
    }
  
    @Get()
    // @Throttle({read: {ttl: 1000, limit: 10}})
    getEmployees(): Promise<Employee[]> {
      return this.employeeService.getAllEmployees();
    }
  
    @Patch(':id')
    // @Throttle({write: {ttl: 1000, limit: 5}})
    updateEmployee(
      @Param('id') id: string,
      @Body() dto: UpdateEmployeeInput,
    ): Promise<Employee> {
      return this.employeeService.updateEmployee(id, dto);
    }
  
    @Delete(':id')
    deleteEmployee(@Param('id') id: string): Promise<void> {
      return this.employeeService.deleteEmployee(id);
    }
  }
  

