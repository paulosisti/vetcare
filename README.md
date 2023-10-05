# VetCare Application in NestJS

## Overview
The VetCare application is a veterinary clinic management system designed to assist veterinarians, receptionists, and pet owners in managing their daily operations. The application offers features such as patient registration, appointment scheduling, medical history, and report generation.

## Technologies Used
- **NestJS**: A backend framework for Node.js that makes it easy to create scalable and robust applications.
- **TypeScript**: A typed programming language used to enhance security and productivity in development.
- **PostgreSQL**: A relational database management system used to store critical information such as patient data and medical records.
- **Prisma**: An Object-Relational Mapping (ORM) responsible for interfacing with the application's database.

## Directory Structure
The project directory structure for VetCare can be organized as follows:


```shell
src
├───modules
│   ├───auth
│   │   ├───controller
│   │   ├───dtos
│   │   ├───entities
│   │   ├───strategies
│   │   └───auth.module.ts
│   ├───hygiene
│   │   ├───controller
│   │   ├───dtos
│   │   ├───entities
│   │   ├───service
│   │   └───hygiene.module.ts
│   ├───parasite-control
│   │   ├───controller
│   │   ├───dtos
│   │   ├───entities
│   │   ├───service
│   │   └───parasite-control.module.ts
│   ├───pets
│   │   ├───controller
│   │   ├───dtos
│   │   ├───entities
│   │   ├───service
│   │   └───pets.module.ts
│   ├───users
│   │   ├───controller
│   │   ├───dtos
│   │   ├───entities
│   │   ├───service
│   │   └───users.module.ts
│   └───vaccines
│       ├───controller
│       ├───dtos
│       ├───entities
│       ├───service
│       └───vaccines.module.ts
├───prisma
│    └───prisma.service.ts
│───app.module.ts
└───main.ts
```
## Key Features
- **Patient Registration**: Veterinarians can add detailed information about patients, including name, species, breed, and medical history.
- **Appointment Scheduling**: Receptionists can schedule appointments for patients, specifying the date, time, and reason for the appointment.
- **Medical History**: Veterinarians have access to the complete medical history of each patient, allowing for personalized care.
- **Authentication and Authorization**: The application implements secure authentication to ensure that only authorized users can access the features.
- **Report Generation**: The application can generate customized reports based on patient and appointment data.

## Next Steps
The VetCare project in NestJS is a fictitious example, but you can expand it by adding additional features such as payment integrations, email/SMS notifications, or a customer mobile app.

Be sure to follow best development practices, test your code, and keep the documentation up-to-date as your application evolves. Additionally, consider deploying your application in a secure and scalable production environment when it's ready for use.

This Markdown document provides only a high-level overview of the project. Make sure to document each component and feature in detail in your technical documentation to facilitate collaboration and team maintenance.

Remember that NestJS is a powerful tool for developing Node.js applications, offering flexibility and modularity to meet the specific needs of your project. Good luck with the development of your VetCare application in NestJS!

## Instalation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Paulo Sisti](https://github.com/paulosisti)

## License

Nest is [MIT licensed](LICENSE).
