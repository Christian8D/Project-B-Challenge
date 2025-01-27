// employee.service.ts

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { EventEmitter2 } from 'eventemitter2';
import { v4 as uuid } from 'uuid';
import { Employee } from './models/employee.model';
import { CreateEmployeeInput } from './dtos/create-employee.input';
import { Mutex } from 'async-mutex';

@Injectable()
export class EmployeeService {
  // In-memory storage for demonstration purposes
  private employees: Employee[] = [];

  private locks: Map<string, Mutex> = new Map();

  constructor(private readonly eventEmitter: EventEmitter2) {}

  private normalizeEmail(email: string): string {
    return email.trim().toLowerCase();
  }


  private getMutex(lockKey: string): Mutex {
    if (!this.locks.has(lockKey)) {
      this.locks.set(lockKey, new Mutex());
    }
    return this.locks.get(lockKey)!;
  }


  async createEmployee(dto: CreateEmployeeInput): Promise<Employee> {
    const normalizedEmail = this.normalizeEmail(dto.email);
    const lockKey = `create:${normalizedEmail}`;

    const mutex = this.getMutex(lockKey);

    return mutex.runExclusive(async () => {
      // Check for existing employee with the same name and email
      const existingEmployee = this.employees.find(
        (emp) =>
          this.normalizeEmail(emp.email) === normalizedEmail &&
          emp.name === dto.name,
      );

      if (existingEmployee) {
        throw new BadRequestException(
          `An employee with name "${dto.name}" and email "${dto.email}" already exists.`,
        );
      }

      // Create the new employee
      const employee: Employee = {
        id: uuid(), // Generate a unique ID for the employee
        ...dto,
        email: normalizedEmail, 
      };

  
      this.employees.push(employee);

     
      await this.eventEmitter.emitAsync('employee.created', employee);

      console.log(
        `[EmployeeService] Event "employee.created" emitted for: ${employee.name}`,
      );

      return employee;
    });
  }

  async getEmployeeById(id: string): Promise<Employee> {
    const employee = this.employees.find((emp) => emp.id === id);
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    return employee;
  }

  async getAllEmployees(): Promise<Employee[]> {
    return this.employees;
  }

  async updateEmployee(
    id: string,
    updateFields: Partial<Omit<Employee, 'id' | 'name'>>
  ): Promise<Employee> {
    const employeeIndex = this.employees.findIndex((emp) => emp.id === id);
    if (employeeIndex < 0) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    this.employees[employeeIndex] = {
      ...this.employees[employeeIndex],
      ...updateFields,
    };
    console.log(`[EmployeeService] Employee ${id} updated.`);
    return this.employees[employeeIndex];
  }

  async deleteEmployee(id: string): Promise<void> {
    const employeeIndex = this.employees.findIndex((emp) => emp.id === id);
    if (employeeIndex < 0) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    // Remove the employee from the in-memory store
    const [deletedEmployee] = this.employees.splice(employeeIndex, 1);


    await this.eventEmitter.emitAsync('employee.deleted', deletedEmployee);

    console.log(`[EmployeeService] Employee ${id} deleted.`);
  }
}
