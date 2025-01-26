
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


## Start Project

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

By default, the application runs at:

<li> 🌐 REST & GraphQL: <code>http://localhost:3000</code>
<li> 🎛️ Bull Board: <code>http://localhost:3000/admin/queues</code>
<li> 📡 GraphQL Playground: <code>http://localhost:3000/graphql</code>
<br>
<br>
Log messages will appear in your console as you use the API.



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

One of the primary challenges in this project was ensuring that the queue execution followed the correct order and tracked the steps accurately. Proper order of execution is crucial for maintaining a reliable and predictable system, especially when dealing with asynchronous processes like queuing and event-driven workflows.

<br>

**Ensuring Queue Execution in the Right Order**

To achieve reliable execution, the order of operations was meticulously designed and implemented. The integration of Bull Queue and EventEmitter ensured that each step in the process was decoupled and executed sequentially, with proper logging to track the workflow.

The intended order of execution is as follows:

<br>

**1. Event Emission:** The <code>employee.created</code> event is emitted once the employee is successfully saved in memory:
```bash
[MailListener] Employee created event received: Christian Cosio
```
**2.Job Queuing:** Upon receiving the event, the <code>MailListener</code> triggers the <code>MailService</code> to queue the email task: 
```bash
[MailService] Queuing welcome email job for employee: Christian Cosio
[MailService] Successfully queued email job for employee: Christian Cosio
```
**3.Job Processing:** The queued job is picked up by the <code>MailProcessor</code> for execution. This ensures the email is sent in an asynchronous and scalable manner:
```bash
[Bull Queue] Job #143 received for employee: Christian Cosio
[MailProcessor] Processing email for: Christian Cosio
```
**4.Email Sending Simulation:** The <code>MailProcessor</code> simulates sending the email, logging the email details for verification:
```bash
[MailProcessor] After simulation Data Sent: {"from":"\"HR Dept\" <hr@example.com>","to":"hire@christianc.dev","subject":"Welcome to the Company","text":"Hello Christian Cosio, welcome to project b! Are you ready to unf*ck payroll?"}...
```

**5.Job Completion:** Finally, the queue marks the job as completed and logs the result:
```batch
[MailProcessor] Email (job #143) "sent" successfully to Christian Cosio
[MailQueue] Job #143 completed. Result: {"success":true,"message":"Email sent successfully to hire@christianc.dev"}
```

**Key Techniques to Ensure Proper Order:**
<br>

<li> EventEmitter for Decoupling: </li>
<br>
<p>
By integrating the EventEmitter library, the <code>EmployeeService</code> and <code>MailService</code> were decoupled, ensuring that the employee creation logic remains independent of the email-sending logic. This separation results in cleaner, more modular code and allows for easier maintenance and scalability.
</p>

<br>

<li>Queue Tracking</li>
<ul>Logging was added at each critical step:
<li> When an event is emitted <code>(MailListener)</code>.</li>
<li> When a job is added to the queue <code>(MailService)</code>.</li>
<li> When the queue processes the job <code>(MailProcessor)</code>.</li>
</ul>

<br>

<li>Error Handling and Retries:</li>
<p>
The queue configuration includes mechanisms to handle failures gracefully, such as retrying jobs with backoff and detailed logging for debugging.
</p>

<br>





