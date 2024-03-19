# Baas API Documentation
- ![TypeScript](https://img.shields.io/badge/-TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
- ![NestJS](https://img.shields.io/badge/-NestJS-E0234E?style=flat-square&logo=nestjs&logoColor=white)
- ![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-336791?style=flat-square&logo=postgresql&logoColor=white)


## Introduction

This repository provides a practical example of how to implement a backend service using Nest.js in conjunction with PostgreSQL. This project was developed to demonstrate best architecture and development practices.

## Installation Instructions

To install and configure the Baas API in your on-premises environment, follow these steps:

1. Make sure you have Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).

2. Clone the Baas API repository:

```sh
git clone https://seurepositorio.com/api-baas.git

```

3. Navigate to the project directory:

4. Install project dependencies:

5. After installing the dependencies, you are ready to launch the Baas API locally.
- Start the Project in Production Mode:
```sh
npm start
```

This command starts the application in production mode.

- Start the Project in Development Mode with Change Observation:

```sh
npm run start:dev
```

This command starts the application in development mode with observation of code changes. Any changes to the code will result in an automatic server restart.

- Start the Project in Debug Mode with Change Observation:

```sh
npm run start:debug
```

This command starts the application in debug mode with observation of changes in the code. It allows you to debug your code while observing changes to it.

- Start the Project in Production Mode from the Compiled Files:

```sh
npm run start:prod
```

This command starts the application in production mode from the compiled files. It is useful when you want to run the application in a production environment without having to recompile the code.

- Run Tests:

```sh
npm test
```

This command runs the tests using Jest. It will look for test files in the test and __tests__ directories and run them.

- Run Tests in Observation Mode:

```sh
npm run test:watch
```

This command runs the tests in observation mode. It will continue to watch for changes to the test files and source code, rerunning the tests whenever a change is detected.

- Run Tests with Coverage Report:

```sh
npm run test:cov
```

This command runs the tests with coverage report using Jest. It will provide detailed information about code coverage while running tests.

- Perform Linting on TypeScript Code:

```sh
npm run lint
```

This command performs linting checking on TypeScript code using ESLint. It will attempt to automatically fix any lint issues found.

## Scripts

The Baas API includes the following npm scripts to facilitate development and testing:


## Description

The Baas API provides endpoints for handling accounts, addresses and financial transactions. Below is the description of the main features offered by the API:

### Accounts

Account-related endpoints allow users to:

- List all accounts
- Create a new account
- Get the details of a specific account
- Update an existing account
- Remove an existing account

### Addresses

Address-related endpoints allow users to:

- Create a new address
- Get the details of a specific address

### Financial Transactions

Endpoints related to financial transactions allow users to:

- Get a list of financial transactions for a specific account

## Resources

The Baas API offers the following features:

- **Company**: Represents a company associated with an account.
- **Address**: Represents an address.
- **Account**: Represents an account.
- **SubAccount**: Represents a subsidiary account.
- **FinancialTransaction**: Represents a financial transaction.

## Detailed Documentation

For detailed information about the endpoints, parameters, response codes, and data models, see the OpenAPI documentation provided below.

[OpenAPI Documentation](swagger.json)
