import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { EmployeeService } from './employee.service';
import { CreateEmployeeInput } from './dtos/create-employee.input';
import { UpdateEmployeeInput } from './dtos/create-employee.input';
import { Employee } from './models/employee.model';

@Resolver(() => Employee)
export class EmployeeResolver {
  constructor(private readonly employeeService: EmployeeService) {}

  @Query(() => [Employee], { name: 'employees' })
  async getAllEmployees(): Promise<Employee[]> {
    return this.employeeService.getAllEmployees();
  }

  @Query(() => Employee, { name: 'employee' })
  async getEmployeeById(@Args('id') id: string): Promise<Employee> {
    return this.employeeService.getEmployeeById(id);
  }

  @Mutation(() => Employee)
  async createEmployee(
    @Args('input') input: CreateEmployeeInput,
  ): Promise<Employee> {
    //TODO: console.log('[Resolver] Input:', input);
    return this.employeeService.createEmployee(input);
  }

  @Mutation(() => Employee)
  async updateEmployee(
    @Args('id') id: string,
    @Args('updateFields') updateFields: UpdateEmployeeInput,
  ): Promise<Employee> {
    return this.employeeService.updateEmployee(id, updateFields);
  }

  @Mutation(() => Boolean)
  async deleteEmployee(@Args('id') id: string): Promise<boolean> {
    await this.employeeService.deleteEmployee(id);
    return true;
  }
}
