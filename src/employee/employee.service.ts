import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { EventEmitter2 } from 'eventemitter2';
import { v4 as uuid } from 'uuid';
import { Employee } from './models/employee.model';
import { CreateEmployeeInput } from './dtos/create-employee.input';


// Decoupled version with event emitter
@Injectable()
export class EmployeeService {

  // In-memory storage for demonstration purposes
  private employees: Employee[] = [];

  constructor(private readonly eventEmitter: EventEmitter2) {}

  async createEmployee(dto: CreateEmployeeInput): Promise<Employee> {
    const existingEmployee = this.employees.find(
      (emp) => emp.email === dto.email && emp.name === dto.name,
    );
    if (existingEmployee) {
      throw new BadRequestException(
        `An employee with name "${dto.name}" and email "${dto.email}" already exists.`,
      );
    }
    const employee: Employee = {
      id: uuid(), // Generate a unique ID for the employee
      ...dto,
    };

    // Add the new employee to the in-memory store
    this.employees.push(employee);

    // Emit an event after creation
    await this.eventEmitter.emitAsync('employee.created', employee);
    
    console.log(
      `[EmployeeService] Event "employee.created" emitted for: ${employee.name}`,
    );

    return employee;
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
 async  updateEmployee(
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

    // Emit an event after deletion
    await this.eventEmitter.emitAsync('employee.deleted', deletedEmployee);

    console.log(`[EmployeeService] Employee ${id} deleted.`);
  }
}
