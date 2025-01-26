<div style="text-align: center;">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="NestJS Logo" />
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
4.- Event Emitter – Loose coupling of services to handle side effects when employees are created/deleted<br>
5.- GraphQL Playground – Built-in interactive explorer for GraphQL queries<br>

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

## Deployment
When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

