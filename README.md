
<div align="center"style="text-align: center;">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="NestJS Logo"  style="display: block; margin: 0 auto;"  />
  <img src="https://prod-api.symphony.is/assets/og-image-5.webp" width="220" alt="NestJS Logo"  style="display: block; margin: 0 auto;"  />
</div>

<p align="center">
  <a href="http://www.christianc.dev" target="blank"><img src="https://christianc.dev/wp-content/uploads/2025/01/Screenshot-2025-01-25-at-19.18.29.png"  /></a>
</p>




## Description

##NestJS Employee Management & Mail Queue Demo
**A demo application built with NestJS showcasing:**

1.- Employee Module – CRUD operations on employees (REST & GraphQL)<br>
2.- Email Service – Simulated email functionality using Bull for queueing jobs<br>
3.- Queues & Asynchronous Processing – Usage of Bull for background processing, plus Bull Board for queue monitoring<br>
4.- Event Emitter – Loose coupling of services to handle side effects<br>
5.- GraphQL Playground – Built-in interactive explorer for GraphQL queries<br>
5.- Bull Board – Built-in interactive explorer for Bull Queues<br>

<br>
##Table of Contents
<br>
**Overview**
<br>
- Project Structure
<br>
- Installation & Setup
<br>
- Running the Application
<br>
- Endpoints & Usage:
<li>
   REST Endpoints
</li>

<li>
   GraphQL Endpoints
</li>
<br>
- Queue Management
<br>
- Event Emitter Flow
<br>
- Notes & Customization

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

##Overview
This project demonstrates how to combine REST and GraphQL endpoints in a NestJS application to manage employee data. It also provides a mail queue system for simulating email sends whenever an employee is created. The mail queue is powered by Bull and exposed via Bull Board for real-time job monitoring. Additionally, the EventEmitter library allows decoupling employee creation from email sending.

##Tech Stack
<br>
NestJS – Server-side Framwork
<br>
TypeScript 
<br>
Bull – Queue system
<br>
Bull Board – A UI dashboard to manage Bull queues
<br>
GraphQL – API endpoint for queries and mutations
<br>
REST – Traditional API endpoint structure
<br>
Redis – Required by Bull for storing and retrieving job data

<br>

## Project Structure

**A brief overview of the most important directories/files:**

```bash
.
├── src
│   ├── app.module.ts          # Root application module
│   ├── main.ts                # Application entry point
│   ├── employee
│   │   ├── employee.module.ts
│   │   ├── employee.service.ts
│   │   ├── employee.controller.ts  # REST Endpoint
│   │   ├── employee.resolver.ts    # GraphQL Endpoint
│   │   ├── dtos
│   │   │   └── create-employee.input.ts
│   │   └── models
│   │       └── employee.model.ts
│   ├── mail
│   │   ├── mail.module.ts
│   │   ├── mail.service.ts
│   │   ├── mail.processor.ts
│   │   └── mail.listener.ts
│   ├── queue
│   │   ├── bull.config.ts
│   │   └── queue.enum.ts
│   └── logger.middleware.ts
├── package.json
└── README.md                  # Documentation

```

## Installation & Setup
**1.-Clone the repository or download the source code:**

```bash
git clone https://github.com/your-username/nestjs-employee-demo.git

```

**2.- Install dependencies:**
```bash
cd nestjs-employee-demo
npm install
```

**3.- Install & run Redis:**
Make sure you have a Redis instance running locally on localhost:6379.
<br>
<li> You can use Docker:</li>

```bash
docker run -d --name my-redis -p 6379:6379 redis
```
<li>Or install Redis locally (instructions).</li>
<br>

**4.- (Optional) Configure environment variables:**
The default bull.config.ts points to localhost:6379. If needed, adjust Redis configurations there or via environment variables.

## Running the Application
To run the NestJS server in development mode:

```bash

npm run start:dev
```

By default, the application runs at:

<li>REST & GraphQL: http://localhost:3000
<li>Bull Board: http://localhost:3000/admin/queues
<li>GraphQL Playground: http://localhost:3000/graphql
<br>
<br>
Log messages will appear in your console as you use the API.



## Endpoints & Usage
**GrapQL:**
<p>Global REST prefix is set to api, so endpoints are under http://localhost:3000/api </p>

<ul>
  <li>Endpoint: POST /api/employees</li>
</ul>

**REST:**
```bash
{
  name: "Christian Cosio",
  email: "hire@ChristianC.dev",
  "jobTitle": "Software Engineer",
  "department": "IT"
}

```
<br>
**Get an Employee by ID**
<li>Endpoint: GET /api/employees/:id</li>
<li>Example:</li>


```bash
curl http://localhost:3000/api/employees/EMPLOYEE_ID
```

<br>
**Get all Employees**
<li>Endpoint: GET /api/employees</li>
<li>Example:</li>

```bash
curl http://localhost:3000/api/employees

```







GrapQL
```bash
mutation {
  createEmployee(
    input: {
      name: "Christian Cosio"
      email: "hire@ChristianC.dev"
      jobTitle: "Software Engineer"
      department: "IT"
    }
  ) {
    id
    name
    email
    jobTitle
    department
  }
}

```







