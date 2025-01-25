import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateEmployeeInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  email: string

  @Field()
  @IsString()
  @IsNotEmpty()
  jobTitle: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  department: string;
}