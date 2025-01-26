import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

@InputType()
export class UpdateEmployeeInput {
  @Field({ nullable: true }) 
  jobTitle?: string;

  @Field({ nullable: true }) 
  department?: string;

  @Field({ nullable: true }) 
  email?: string;
}

@InputType()
export class CreateEmployeeInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @Field(() => String)
  @IsString({ message: 'Email must be a valid email address' })
  email: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Job title is required' })
  jobTitle: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Department is required' })
  department: string;
}
