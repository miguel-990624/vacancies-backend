# Vacancies Platform Backend

A **NestJS** application providing the API for the Vacancies Platform. It handles authentication, user roles, vacancy management, and applications.

## Features
-   **Authentication**: JWT-based login/register with API Key protection.
-   **Roles**:
    -   `admin`: Full access (manage vacancies, view all applications).
    -   `gestor`: Vacancy management (no access to all applications).
    -   `coder`: View vacancies, apply, view own applications.
-   **Entities**: Users, Vacancies, Applications (PostgreSQL + TypeORM).

## Prerequisites
-   Node.js (v18+)
-   PostgreSQL
-   API Key & JWT Secret (configured in `.env`)

## Setup

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Environment Variables**:
    Ensure your `.env` file contains:
    ```env
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=postgres
    DB_PASS=your_password
    DB_NAME=vacancy
    API_KEY=your_secure_api_key
    JWT_SECRET=your_jwt_secret
    ```

3.  **Run the application**:
    ```bash
    # Development mode
    npm run start:dev
    ```
    The server will start on `http://localhost:3000`.

## Key Endpoints
-   `POST /auth/login` - Login user.
-   `POST /auth/register` - Register new user.
-   `GET /vacancies` - List active vacancies.
-   `POST /applications` - Apply to a vacancy (Coder).
-   `GET /applications/my` - View my applications (Coder).
-   `GET /applications` - View all applications (Admin only).
