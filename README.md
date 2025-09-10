# Timely API (Mongoose + MVC)

## Overview

This is a **RESTful API** for managing employee attendance and related data in the **Shwapno Attendance System**. The API is built using **Node.js**, **Express**, and **MongoDB**, with **Mongoose** for data modeling and **JWT** authentication.

### Features

- **Employee Management**: Create, update, delete, and retrieve employee records.
- **Date Range Filtering**: Get employee records for a specific date range.
- **Pagination and Sorting**: Supports pagination and sorting for employee data.
- **JWT Authentication**: Secures all endpoints with JWT authentication.
- **Users Management**: Retrieve user data and manage user login.
- **Outlets Management**: Create or update outlet records associated with employees.

---

## Technologies Used

- **Node.js** (Backend)
- **Express.js** (Web Framework)
- **MongoDB** (Database)
- **Mongoose** (ODM for MongoDB)
- **JWT** (JSON Web Token for authentication)

---

## Setup & Installation

**Clone the repository**:

```bash
git clone https://github.com/ovi100/timely-api.git
cd timely-api
```

## Install dependencies:

    npm install

## Set up the environment variables:

Create a **.env** file and update the following values:
**MONGO_URI**: MongoDB connection URI (e.g., MongoDB Atlas)
**JWT_KEY**: Secret key for signing JWT tokens

## Run the development server:

    npm run dev

---

## API Endpoints

#### Authentication

```bash
  POST /api/auth/login
  Description: Logs in the user and generates a JWT token.
  Body: { "staff_id": "string", "password": "string" }
  Response:
  200 OK: { "status": true, "message": "Login successful", "token": "Bearer <token>" }
  401 Unauthorized: { "status": false, "message": "Authentication failed!" }
```

### Users

```bash
GET /api/users
Description: Retrieve all users.
Authorization: Bearer <token>
Response: List of all users in the database.
GET /api/users/:id
Description: Retrieve a specific user by staff_id.
Authorization: Bearer <token>
Response: User data.
```

### Employees

```bash
GET /api/users
Description: Retrieve all users.
Authorization: Bearer <token>
Response: List of all users in the database.
GET /api/users/:id
Description: Retrieve a specific user by staff_id.
Authorization: Bearer <token>
Response: User data.
```

```bash
GET /api/employees
**Description**: Retrieve a list of employees, with optional date range filtering and sorting.
##### Query Parameters:
from (optional): Date in YYYY-MM-DD format.
to (optional): Date in YYYY-MM-DD format.
id (optional): Filter by employee staff_id.
order (optional, default "asc"): Sorting criteria (e.g., date, asc or desc).
authorization: Bearer <token>
Response: List of employees and pagination info.
```

```bash
GET /api/employees/:id
Description: Retrieve an employee's record by staff_id. If no record exists for today, returns the most recent record.
authorization: Bearer <token>
Response: Employee data.
```

```bash
POST /api/employees
Description: Create a new employee record.
Body: Employee data (e.g., staff_id, date, status).
authorization: Bearer <token>
Response: 200 OK with a success message.
```

```bash
PATCH /api/employees/:id
Description: Update today's employee record by staff_id.
Body: Fields to update (e.g., status).
authorization: Bearer <token>
Response: 200 OK with a success message.
```

```bash
DELETE /api/employees/:id
Description: Delete all records for a specific employee by staff_id.
authorization: Bearer <token>
Response: 200 OK with a success message.
```

#### Outlets

```bash
POST /api/outlets
Description: Create or update an outlet record by staff_id.
Body: Outlet data (e.g., staff_id, outlet_code, outlet_name).
Authorization: Bearer <token>
Response: Success message.
```
