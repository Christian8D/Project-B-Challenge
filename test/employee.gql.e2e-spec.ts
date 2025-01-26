// test/employee.gql.e2e-spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('EmployeeResolver (e2e) - GraphQL', () => {
  let app: INestApplication;
  const graphqlEndpoint = '/graphql';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  let createdEmployeeId: string;

  it('should create an employee via GraphQL mutation', async () => {
    const createMutation = `
      mutation {
        createEmployee(dto: {
          name: "Jane Doe"
          email: "jane@example.com"
          jobTitle: "QA Engineer"
          department: "Quality"
        }) {
          id
          name
          email
          jobTitle
          department
        }
      }
    `;
    const response = await request(app.getHttpServer())
      .post(graphqlEndpoint)
      .send({ query: createMutation })
      .expect(200);

    const { data } = response.body;
    expect(data.createEmployee).toHaveProperty('id');
    expect(data.createEmployee.name).toBe('Jane Doe');
    createdEmployeeId = data.createEmployee.id;
  });

  it('should get all employees via GraphQL query', async () => {
    const employeesQuery = `
      query {
        getAllEmployees {
          id
          name
          email
          jobTitle
          department
        }
      }
    `;
    const response = await request(app.getHttpServer())
      .post(graphqlEndpoint)
      .send({ query: employeesQuery })
      .expect(200);

    const { data } = response.body;
    expect(Array.isArray(data.getAllEmployees)).toBe(true);
    expect(data.getAllEmployees.length).toBeGreaterThan(0);
  });

  it('should update an employee via GraphQL mutation', async () => {
    const updateMutation = `
      mutation {
        updateEmployee(
          id: "${createdEmployeeId}",
          dto: {
            department: "Engineering"
          }
        ) {
          id
          department
        }
      }
    `;
    const response = await request(app.getHttpServer())
      .post(graphqlEndpoint)
      .send({ query: updateMutation })
      .expect(200);

    const { data } = response.body;
    expect(data.updateEmployee.department).toBe('Engineering');
  });

  it('should delete an employee via GraphQL mutation', async () => {
    const deleteMutation = `
      mutation {
        deleteEmployee(id: "${createdEmployeeId}")
      }
    `;
    await request(app.getHttpServer())
      .post(graphqlEndpoint)
      .send({ query: deleteMutation })
      .expect(200);
  });
});
