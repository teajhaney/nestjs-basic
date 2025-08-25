# ✨ Travel Destination API: A Robust Foundation CRUD Api

## Overview
This is a robust backend API built with NestJS, TypeScript, and Prisma ORM, designed to demonstrate core backend development concepts including authentication, user management, and resource management with a PostgreSQL database. It serves as a comprehensive example of building secure and scalable RESTful services.

## Features
- **Authentication**: JWT-based user registration and login with secure password hashing using bcrypt.
- **User Management**: Secure handling of user data and profiles with unique email constraints.
- **Destination Management**: Full CRUD (Create, Read, Update, Delete) operations for managing user-specific travel destinations.
- **Database Integration**: Seamless interaction with a PostgreSQL database facilitated by Prisma ORM for type-safe database access.
- **API Security**: Route protection implemented with NestJS guards and Passport-JWT strategy, requiring valid JWT tokens for access to protected resources.
- **Data Validation**: Robust request payload validation utilizing `class-validator` and NestJS's `ValidationPipe` for ensuring data integrity.
- **Dependency Injection**: Leverages NestJS's powerful and declarative dependency injection system for modular, testable, and maintainable code.
- **Configuration Management**: Environment variable handling using `@nestjs/config` for flexible and secure application settings.

## Getting Started
To get this project up and running, follow these steps.

### Environment Variables
Create a `.env` file in the root directory of the project and populate it with the following variables:

```
PORT=3000
DATABASE_URL="postgresql://user:password@host:port/database?schema=public"
JWT_SECRET="yourSuperSecretJwtKey"
```
- `PORT`: The port on which the NestJS application will listen. (e.g., `3000`)
- `DATABASE_URL`: Your PostgreSQL connection string. Ensure Prisma can connect to your database.
  - Example: `postgresql://johndoe:randompassword@localhost:5432/mydatabase?schema=public`
- `JWT_SECRET`: A strong, random string used to sign and verify JSON Web Tokens. This is crucial for security.
  - Example: `aStrongAndComplexSecretKeyForJWTAuthentication`

### Usage
Follow these detailed instructions to set up and run the application locally:

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/teajhaney/travel-api.git
    cd nestjs-concepts
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Setup Database (Prisma Migrations)**
    Ensure your PostgreSQL database is running and accessible via the `DATABASE_URL` in your `.env` file. Then, apply the Prisma migrations to create the necessary tables:
    ```bash
    npx prisma migrate dev --name init
    ```
    This command will apply any pending migrations and generate the Prisma client.

4.  **Start the Application in Development Mode**
    ```bash
    npm run start:dev
    # or
    yarn start:dev
    ```
    The application will start in watch mode, meaning it will automatically recompile and reload upon code changes. It will typically be accessible at `http://localhost:3000` (or the port specified in your `.env`).

5.  **Start the Application in Production Mode**
    First, build the application:
    ```bash
    npm run build
    # or
    yarn build
    ```
    Then, start the compiled application:
    ```bash
    npm run start:prod
    # or
    yarn start:prod
    ```

## API Documentation
### Base URL
The API is accessible at `http://localhost:3000` (or your configured `PORT`). All endpoints are relative to this base URL.

### Endpoints

#### `POST /auth/signup`
Registers a new user with an email and password.
**Request**:
```json
{
  "email": "user@example.com",
  "password": "StrongPassword123"
}
```
**Response**:
```json
{
  "id": 1,
  "email": "user@example.com",
  "createdAt": "2023-10-26T10:00:00.000Z",
  "updatedAt": "2023-10-26T10:00:00.000Z"
}
```
**Errors**:
- `409 Conflict`: User already exists with this email.
- `400 Bad Request`: Validation errors (e.g., invalid email format, password too short).

#### `GET /auth/signin`
Authenticates a user and returns a JWT token.
**Request**:
```json
{
  "email": "user@example.com",
  "password": "StrongPassword123"
}
```
**Response**:
```json
{
  "id": 1,
  "email": "user@example.com",
  "createdAt": "2023-10-26T10:00:00.000Z",
  "updatedAt": "2023-10-26T10:00:00.000Z",
  "token": "token.here"
}
```
**Errors**:
- `401 Unauthorized`: Email or password is incorrect.
- `400 Bad Request`: Validation errors.

#### `POST /destinations`
Creates a new travel destination for the authenticated user.
**Request**:
_Requires `Authorization: Bearer <token>` header._
```json
{
  "name": "Eiffel Tower Trip",
  "travelDate": "2024-12-25T00:00:00.000Z",
  "note": "A romantic trip to Paris."
}
```
**Response**:
```json
{
  "id": 1,
  "name": "Eiffel Tower Trip",
  "travelDate": "2024-12-25T00:00:00.000Z",
  "notes": "A romantic trip to Paris.",
  "createdAt": "2023-10-26T10:00:00.000Z",
  "updatedAt": "2023-10-26T10:00:00.000Z",
  "userId": 1
}
```
**Errors**:
- `401 Unauthorized`: Missing or invalid JWT token.
- `400 Bad Request`: Validation errors (e.g., `name` is empty, `travelDate` is not a valid date string).

#### `GET /destinations/all`
Retrieves all destinations stored in the database, irrespective of the user.
**Response**:
_Requires `Authorization: Bearer <token>` header._
```json
[
  {
    "id": 1,
    "name": "Eiffel Tower Trip",
    "travelDate": "2024-12-25T00:00:00.000Z",
    "notes": "A romantic trip to Paris.",
    "createdAt": "2023-10-26T10:00:00.000Z",
    "updatedAt": "2023-10-26T10:00:00.000Z",
    "userId": 1
  },
  {
    "id": 2,
    "name": "Mount Fuji Hike",
    "travelDate": "2025-07-15T00:00:00.000Z",
    "notes": null,
    "createdAt": "2023-10-26T10:05:00.000Z",
    "updatedAt": "2023-10-26T10:05:00.000Z",
    "userId": 2
  }
]
```
**Errors**:
- `401 Unauthorized`: Missing or invalid JWT token.

#### `GET /destinations`
Retrieves all destinations associated with the authenticated user.
**Response**:
_Requires `Authorization: Bearer <token>` header._
```json
[
  {
    "id": 1,
    "name": "Eiffel Tower Trip",
    "travelDate": "2024-12-25T00:00:00.000Z",
    "notes": "A romantic trip to Paris.",
    "createdAt": "2023-10-26T10:00:00.000Z",
    "updatedAt": "2023-10-26T10:00:00.000Z",
    "userId": 1
  }
]
```
**Errors**:
- `401 Unauthorized`: Missing or invalid JWT token.

#### `GET /destinations/:id`
Retrieves a single destination by its ID for the authenticated user.
**Response**:
_Requires `Authorization: Bearer <token>` header._
```json
{
  "id": 1,
  "name": "Eiffel Tower Trip",
  "travelDate": "2024-12-25T00:00:00.000Z",
  "notes": "A romantic trip to Paris.",
  "createdAt": "2023-10-26T10:00:00.000Z",
  "updatedAt": "2023-10-26T10:00:00.000Z",
  "userId": 1
}
```
**Errors**:
- `401 Unauthorized`: Missing or invalid JWT token.
- `404 Not Found`: Destination not found for the specified ID and authenticated user.

#### `DELETE /destinations/:id`
Deletes a destination by its ID for the authenticated user.
**Response**:
_Requires `Authorization: Bearer <token>` header._
```json
{
  "id": 1,
  "name": "Eiffel Tower Trip",
  "travelDate": "2024-12-25T00:00:00.000Z",
  "notes": "A romantic trip to Paris.",
  "createdAt": "2023-10-26T10:00:00.000Z",
  "updatedAt": "2023-10-26T10:00:00.000Z",
  "userId": 1
}
```
**Errors**:
- `401 Unauthorized`: Missing or invalid JWT token.
- `404 Not Found`: Destination not found for the specified ID and authenticated user.

#### `PATCH /destinations/:id`
Updates an existing destination by its ID for the authenticated user.
**Request**:
_Requires `Authorization: Bearer <token>` header._
```json
{
  "name": "Eiffel Tower Adventure",
  "note": "Updated note: A fantastic journey to Paris."
}
```
**Response**:
```json
{
  "id": 1,
  "name": "Eiffel Tower Adventure",
  "travelDate": "2024-12-25T00:00:00.000Z",
  "notes": "Updated note: A fantastic journey to Paris.",
  "createdAt": "2023-10-26T10:00:00.000Z",
  "updatedAt": "2023-10-26T10:15:00.000Z",
  "userId": 1
}
```
**Errors**:
- `401 Unauthorized`: Missing or invalid JWT token.
- `404 Not Found`: Destination not found for the specified ID and authenticated user.
- `400 Bad Request`: Validation errors (e.g., `travelDate` is not a valid date string).

## Technologies Used

| Technology    | Description                                       | Link                                                       |
| :------------ | :------------------------------------------------ | :--------------------------------------------------------- |
| NestJS        | Progressive Node.js framework for building efficient, reliable, and scalable server-side applications. | [NestJS](https://nestjs.com/)                              |
| TypeScript    | A superset of JavaScript that adds static types.  | [TypeScript](https://www.typescriptlang.org/)              |
| Prisma        | Next-generation ORM that makes database access easy with type safety. | [Prisma](https://www.prisma.io/)                           |
| PostgreSQL    | Powerful, open-source object-relational database system. | [PostgreSQL](https://www.postgresql.org/)                  |
| JWT           | JSON Web Tokens for secure API authentication.    | [JWT.io](https://jwt.io/)                                  |
| Bcrypt        | Library for hashing passwords securely.           | [Bcrypt (npm)](https://www.npmjs.com/package/bcrypt)       |
| Passport.js   | Authentication middleware for Node.js.            | [Passport.js](http://www.passportjs.org/)                  |
| class-validator | Validation decorators for classes.                | [class-validator](https://github.com/typestack/class-validator) |

## License
This project is currently unlicensed.

## Author Info
- Your Name: [Your LinkedIn](https://www.linkedin.com/in/yourprofile) | [Your Portfolio](https://yourportfolio.com) | [Your Twitter](https://twitter.com/yourhandle)

---

[![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)
