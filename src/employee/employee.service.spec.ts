

import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeService } from './employee.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateEmployeeInput } from './dtos/create-employee.input';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let mockEventEmitter: Partial<EventEmitter2>;

  beforeEach(async () => {
    mockEventEmitter = {
      emitAsync: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeeService,
        {
          provide: EventEmitter2,
          useValue: mockEventEmitter,
        },
      ],
    }).compile();

    service = module.get<EmployeeService>(EmployeeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new employee', async () => {
    const employeeDto: CreateEmployeeInput = {
        name: 'Christian Cosio',
      email: 'Hire@ChristianC.dev',
      jobTitle: 'Software Engineer',
      department: 'IT',
    };

    const newEmployee = await service.createEmployee(employeeDto);

    expect(newEmployee.id).toBeDefined();
    expect(newEmployee.name).toBe(employeeDto.name);
    expect(mockEventEmitter.emitAsync).toHaveBeenCalledWith('employee.created', newEmployee);
  });

  it('should get an employee by id', async () => {
    const employeeDto: CreateEmployeeInput = {
        name: 'Manny Pacquiao',
        email: 'Hire@mannyPacquiao.dev',
        jobTitle: 'HR Manager',
        department: 'HR',
    };
    const created = await service.createEmployee(employeeDto);

    const found = await service.getEmployeeById(created.id);
    expect(found).toEqual(created);
  });

  it('should update an employee without emitting an event', async () => {
    const employeeDto: CreateEmployeeInput = {
      name: 'Christian Cosio',
      email: 'Hire@ChristianC.dev',
      jobTitle: 'Software Engineer',
      department: 'IT',
    };
    const created = await service.createEmployee(employeeDto);

    // Clear the mock after createEmployee to isolate calls during updateEmployee
    (mockEventEmitter.emitAsync as jest.Mock).mockClear();

    const updated = await service.updateEmployee(created.id, {
      jobTitle: 'Senior Backend Developer',
      department: 'Engineering',
    });

    expect(updated.jobTitle).toBe('Senior Backend Developer');
    expect(updated.department).toBe('Engineering');

    // Ensure no event was emitted during update
    expect(mockEventEmitter.emitAsync).not.toHaveBeenCalled();
  });

  it('should throw an error when updating a non-existent employee', async () => {
    await expect(
      service.updateEmployee('non-existent-id', { jobTitle: 'Updated Job' }),
    ).rejects.toThrow('Employee with ID non-existent-id not found');
  });

  it('should delete an employee', async () => {
    const employeeDto: CreateEmployeeInput = {
      name: 'Micho Pacheco',
      email: 'micho@abuggydeveloper.dev',
      jobTitle: 'Frontend Developer',
      department: 'IT',
    };
    const created = await service.createEmployee(employeeDto);

    await service.deleteEmployee(created.id);

    // Attempting to retrieve the deleted employee should throw an error
    await expect(service.getEmployeeById(created.id)).rejects.toThrow(
      `Employee with ID ${created.id} not found`,
    );

    // Verify that the 'employee.deleted' event is emitted
    expect(mockEventEmitter.emitAsync).toHaveBeenCalledWith(
      'employee.deleted',
      expect.objectContaining({ id: created.id }),
    );
  });

  it('should throw an error when deleting a non-existent employee', async () => {
    await expect(service.deleteEmployee('non-existent-id')).rejects.toThrow(
      'Employee with ID non-existent-id not found',
    );
  });
});
