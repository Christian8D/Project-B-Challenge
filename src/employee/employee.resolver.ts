import { Args, Query, Resolver, Mutation } from "@nestjs/graphql";
import { Employee } from "./models/employee.model";
import { EmployeeService } from "./employee.service";
import { CreateEmployeeInput } from "./dtos/create-employee.input";





@Resolver(() => Employee)
export class EmployeeResolver {
    constructor(private readonly employeeService: EmployeeService) {
        console.log('EmployeeResolver constructor');
    }

    @Query(() => [Employee], { name: 'employees' })
    getAllEmployees(){
        return this.employeeService.getAllEmployees();
    }

    @Query(() => Employee, { name: 'employee' })
    getEmployeeById(@Args('id') id: string){
        return this.employeeService.getEmployeeById(id);
    }

    @Mutation(() => Employee)
    createEmployee(@Args('data') data: CreateEmployeeInput){
        return this.employeeService.createEmployee(data);
    }

    @Mutation(() => Employee)
    updateEmployee(
        @Args('id') id: string,
        @Args('email') email: string,
        @Args('jobTitle') jobTitle: string,
        @Args('department') department: string,
    ){
        return this.employeeService.updateEmployee(id, { jobTitle, department, email});
    }
    
    @Mutation(() => Boolean)
    deleteEmployee(@Args('id') id: string){
        this.employeeService.deleteEmployee(id);
        return true;
    }

}