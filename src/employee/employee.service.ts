import { Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from 'eventemitter2';
import { v4 as uuid } from 'uuid';
import { Employee } from './models/employee.model';
// import { CreateEmployeeDto } from './dtos/create-employee.dto.ts';
import { CreateEmployeeInput } from './dtos/create-employee.input';

//decoupled version with event emitter
@Injectable()
export class EmployeeService {
    // In-memory storage for demonstration purposes
    private employees: Employee[] = [];

    constructor (
        private readonly eventEmitter: EventEmitter2,
    ){}

    createEmployee(dto: CreateEmployeeInput): Employee {
        const employee: Employee = {
            id: uuid(),
            ...dto,
        };
        this.employees.push(employee);
        this.eventEmitter.emit('employee.created', employee);
        console.log('[EmployeeService] Event "employee.created" emitted for:', employee.name); // Debug log
        return employee;
    }
    
    getEmployeeById(id: string): Employee {
        const employee = this.employees.find((emp) => emp.id === id);
        if (!employee) {
            throw new NotFoundException(`Employee with ID ${id} not found`);
        }
        return employee;
    }
    getAllEmployees(): Employee[] {
        return this.employees;
    }

    updateEmployee(
        id: string,
        updateFields: Partial<Omit<Employee, 'id' | 'name'>>
    ): Employee {
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

    deleteEmployee(id: string): void {
        const employeeIndex = this.employees.findIndex((emp) => emp.id === id);
        if (employeeIndex < 0) {
            throw new NotFoundException(`Employee with ID ${id} not found`);
        }
        this.employees.splice(employeeIndex, 1);
        console.log(`[EmployeeService] Employee ${id} deleted.`);
    }

}


// coupled version without event emitter
// }

// export class EmployeeService {
//   // In-memory storage for demonstration purposes
//   private employees: Employee[] = [];

//   createEmployee(dto: CreateEmployeeDto): Employee {
//     const employee: Employee = {
//       id: uuid(),
//       ...dto,
//     };
//     this.employees.push(employee);
//     return employee;
//   }

//   getEmployeeById(id: string): Employee {
//     const employee = this.employees.find((emp) => emp.id === id);
//     if (!employee) {
//       throw new NotFoundException(`Employee with ID ${id} not found`);
//     }
//     return employee;
//   }

//   getAllEmployees(): Employee[] {
//     return this.employees;
//   }

//   updateEmployee(
//     id: string,
//     updateFields: Partial<Omit<Employee, 'id' | 'name'>>,
//   ): Employee {
//     const employeeIndex = this.employees.findIndex((emp) => emp.id === id);
//     if (employeeIndex < 0) {
//       throw new NotFoundException(`Employee with ID ${id} not found`);
//     }
//     this.employees[employeeIndex] = {
//       ...this.employees[employeeIndex],
//       ...updateFields,
//     };
//     return this.employees[employeeIndex];
//   }

//   deleteEmployee(id: string): void {
//     const employeeIndex = this.employees.findIndex((emp) => emp.id === id);
//     if (employeeIndex < 0) {
//       throw new NotFoundException(`Employee with ID ${id} not found`);
//     }
//     this.employees.splice(employeeIndex, 1);
//   }
// }
