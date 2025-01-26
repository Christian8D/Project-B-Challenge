
<div align="center"style="text-align: center;">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="NestJS Logo"  style="display: block; margin: 0 auto;"  />
  <img src="https://prod-api.symphony.is/assets/og-image-5.webp" width="220" alt="NestJS Logo"  style="display: block; margin: 0 auto;"  />
</div>

<p align="center">
  <a href="http://www.christianc.dev" target="blank"><img src="https://christianc.dev/wp-content/uploads/2025/01/Screenshot-2025-01-25-at-19.18.29.png"  /></a>
</p>




## Description

**NestJS Employee Management & Mail Queue Demo**
**A demo application built with NestJS showcasing:**

1.- 👥 Employee Module – CRUD operations on employees (REST<code>.controller</code> & GraphQL<code>.resolver</code>)<br>
2.- ✉️ Email Service – Simulated email functionality using Bull for queueing jobs<br>
3.- ⏱️ Queues & Asynchronous Processing – Usage of Bull for background processing, plus Bull Board for queue monitoring<br>
4.- 📡 Event Emitter – Loose coupling of services to handle side effects<br>
5.- 🛠️ GraphQL Playground – Built-in interactive explorer for GraphQL queries<br>
5.- 🎛️ Bull Board – Built-in interactive explorer for Bull Queues<br>

<br>


## 📚 Table of Contents

- 📄 [Overview](#overview)
- ⚙️ [Installation & Setup](#installation--setup)
- 🚀 [Running the Application](#running-the-application)
- 🌐 [Endpoints & Usage](#endpoints--usage)
  - 🔗 [REST Endpoints](#rest-endpoints)
  - 📜 [GraphQL Endpoints](#graphql-endpoints)
- 📂 [Project Structure](#project-structure)
- 📦 [Queue Management](#queue-management)
- 🔔 [Event Emitter Flow](#event-emitter-flow)
- 💡 [Challenges and Observations](#challenges-and-observations)


## Installation & Setup


**1.📥 Clone the repository or download the source code:**

```bash
git clone https://github.com/Christian8D/Coding-Challenge-NestJS-Backend-with-Employee-Module-and-Email-Service.git

```

**2.📦 Install dependencies:**
```bash
cd Coding-Challenge-NestJS-Backend-with-Employee-Module-and-Email-Service
npm install
```

**3.🛢️ Install & run Redis:**
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

## Project setup

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

## Running the Application
To run the NestJS server in development mode:

```bash

npm run start:dev
```

By default, the application runs at:

<li> 🌐 REST & GraphQL: <code>http://localhost:3000</code>
<li> 🎛️ Bull Board: <code>http://localhost:3000/admin/queues</code>
<li> 📡 GraphQL Playground: <code>http://localhost:3000/graphql</code>
<br>
<br>
Log messages will appear in your console as you use the API.


## Overview
This project demonstrates how to combine REST and GraphQL endpoints in a NestJS application to manage employee data. It also provides a mail queue system for simulating email sends whenever an employee is created. The mail queue is powered by Bull and exposed via Bull Board for real-time job monitoring. Additionally, the EventEmitter library enables decoupling employee creation from email sending, providing a scalable and modular solution.

## ⚙️ Tech Stack
<br>
🛠️ NestJS – Server-side Framwork
<br>
💻 TypeScript 
<br>
⏱️ Bull – Queue system
<br>
🎛️ Bull Board – A UI dashboard to manage Bull queues
<br>
📡 GraphQL – API endpoint for queries and mutations
<br>
🌐 REST – Traditional API endpoint structure
<br>
🛢️ Redis – Required by Bull for storing and retrieving job data

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



## Endpoints & Usage
## REST Endpoints
<p>Global REST prefix is set to api, so endpoints are under <code>http://localhost:3000/api</code> </p>

<ul>
  <li>Endpoint: <code>POST /api/employees</code></li>
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
<li>Endpoint: <code>GET /api/employees/:id</code> :accessibility:</li>
<li>Example:</li>


```bash
curl http://localhost:3000/api/employees/EMPLOYEE_ID
```

<br>
**Get all Employees**
<li>Endpoint: <code>GET /api/employees</code></li>
<li>Example:</li>

```bash
curl http://localhost:3000/api/employees

```

<br>
**Update an Employees**
<li>Endpoint: <code>GET /api/employees/:id</code> :accessibility:</li>
<li>Body: Partial fields you want to update. For example:</li>

```bash
{
  "jobTitle": "Senior Software Engineer",
  "department": "Engineering"
}

```

<br>
**Delete an Employees**
<li><code>DELETE /api/employees/:id</code> 🚯</li>
<li>Example:</li>

```bash
curl -X DELETE http://localhost:3000/api/employees/EMPLOYEE_ID
```

## GraphQL Endpoints
** The GraphQL endpoint is available at: **
<br>
<code>http://localhost:3000/graphql</code>
<br>
Open it in your browser to access the GraphQL Playground. You can write queries or mutations to manage Employee data.

**Sample GraphQL Query**
```bash

query{
  employees{
    id
    name
    email
    jobTitle
    department
  }
}

```


**Sample GraphQL Mutation**
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

## Queue Management

<p>This application uses Bull to queue email jobs and Bull Board to visualize them.</p>
<br>

**1.-Queue Setup**

<li>Defined in bull.config.ts, connecting to Redis (<code>default: localhost:6379</code>).</li>
<li>A single queue is registered named <code>MAIL_QUEUE</code> (see QueueName enum).</li>
<br>

**2.-Queue Processing**
<li>Implemented by <code>MailProcessor</code> in <code>mail.processor.ts</code>.</li>
<li>When an employee.created event is emitted, a background job (<code>sendWelcomeEmail</code>) is added to the queue.</li>
<li>The queue processor simulates sending an email by logging details to the console.</li>
<br>

3.-Bull Board 
<ul>Access the dashboard at <code>http://localhost:3000/admin/queues</code> to monitor or manage queued jobs:</ul>
<li>Active – Jobs currently processing.</li>
<li>Completed – Successfully processed jobs.</li>
<li>Failed – Jobs that encountered errors.</li>



## Event Emitter Flow
**1.-Employee Created**

<li> In <code>EmployeeService.createEmployee()</code>, once a new employee is saved in the in-memory array, an event <code>employee.created</code> is emitted.</li>
<br>

**2.-Mail Listener**

<li>In <code>MailListener</code>, the <code>@OnEvent('employee.created')</code> decorator picks up this event and calls <code>MailService.sendWelcomeEmail()</code> asynchronously.</li>
<br>

**3.-Mail Service**

<li><code>MailService</code> enqueues a new job (<code>sendWelcomeEmail</code>) to the <code>MAIL_QUEUE</code>.</li>
<br>

**4.-Mail Processor**

<li><code>MailProcessor</code> listens for <code>sendWelcomeEmail</code> jobs in the queue. Once processed, it simulates an email send.</li>

<p>
This loosely coupled architecture means you can easily attach additional functionality whenever an employee is created—simply add new event listeners.
</p>

## Challenges and Observations

blabla


