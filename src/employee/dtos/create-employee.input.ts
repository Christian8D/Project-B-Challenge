// import { InputType, Field } from '@nestjs/graphql';
// import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

// @InputType()
// export class CreateEmployeeInput {
//   @Field()
//   @IsString()
//   @IsNotEmpty({ message: 'Name is required' })
//   name: string;

//   @Field()
//   @IsEmail({}, { message: 'Email must be a valid email address' })
//   email: string;

//   @Field()
//   @IsString()
//   @IsNotEmpty({ message: 'Job title is required' })
//   jobTitle: string;

//   @Field()
//   @IsString()
//   @IsNotEmpty({ message: 'Department is required' })
//   department: string;
// }


import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

@InputType()
export class UpdateEmployeeInput {
  @Field({ nullable: true }) // Nullable because updates are partial
  jobTitle?: string;

  @Field({ nullable: true }) // Nullable because updates are partial
  department?: string;

  @Field({ nullable: true }) // Nullable because updates are partial
  email?: string;
}

@InputType()
export class CreateEmployeeInput {
  @Field(() => String) // Explicitly indicate this field is a string in GraphQL
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
