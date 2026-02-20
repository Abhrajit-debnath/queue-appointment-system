<!-- # 🏥 Queue Appointment System

![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![Express](https://img.shields.io/badge/Express-5.x-green)
![MongoDB](https://img.shields.io/badge/MongoDB-8.x-green)
![Mongoose](https://img.shields.io/badge/Mongoose-9.x-red)
![Redis](https://img.shields.io/badge/Redis-8.x-red)
![License](https://img.shields.io/badge/License-ISC-blue)

## Overview

> An appointment queue management system that allows businesses to manage customer appointments efficiently with real-time queue tracking with role-based access control along with redis caching.

## Features

- JWT Authentication
- Appointment Booking
- Staff And Business Management
- Real-time Queue Management
- Role-based Access Management
- Redis Caching (50x faster)
- Queue Status Tracking and updation

## Features BreakDown

#### JWT Authentication

> Implemented jwt authentication and password hashing for secure login/signup with bcrypt.js

#### Appointment Booking

> Implemented appointment booking system within a business and related operations.

#### Staff And Business Management

> Implemented Staff and business management that lets anyone create their business and manage their staff according to their roles. Assigning staffs to business which lets them handel appointments operation.

#### Real-time Queue Management

> Implemented real-time queue management by generating a queue request to the server by their businessIds and in return we get the queues sorted in a ascending order according to their appointment time with a queue number for better readability.

#### Role-based Access Management

> Implemented role-based access management which helps to separate the logic of Owners, Users, Staffs and their responsibilities on the system, also it helps to restrict the access of resources of another roles'

##### Relationships of their roles

| Roles | Relations   |
| ----- | ----------- |
| Owner | one to one  |
| User  | one to one  |
| Staff | one to many |

#### Redis Caching (50x faster)

> Implemented caching layer which helps to limit the query to the databases repeatedly for the same results. Also implemented cache invalidation when the state changes in database and show the original data feed to database.

#### Queue Status Tracking and updation

> Implemented queue status trackting and updation when a appointment is completed or pending. So we have three states Pending, in_Progress, Completed which can be updated by the staffs only and when a appointment is complete then we are filtering the queue and removing the completed one on the response but keeping the resord in database for further query.

## 🛠️ Tech Stack

| Layer     | Technology |
| --------- | ---------- |
| Runtime   | Node.js    |
| Framework | Express.js |
| Database  | MongoDB    |
| Cache     | Redis      |
| Auth      | JWT        |
| Testing   | k6         |

## Getting Started

### Installation

## Clone the repo

```
https://github.com/Abhrajit-debnath/queue-appointment-system

```

## Install Dependencies

- cd project
- npm install

## Start The Server

```
npm run dev
```

## Improvements -->

# 🏥 Queue Appointment System

![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![Express](https://img.shields.io/badge/Express-5.x-green)
![MongoDB](https://img.shields.io/badge/MongoDB-8.x-green)
![Mongoose](https://img.shields.io/badge/Mongoose-9.x-red)
![Redis](https://img.shields.io/badge/Redis-8.x-red)
![License](https://img.shields.io/badge/License-ISC-blue)

## 📌 Overview

> An appointment queue management system that allows businesses to manage
> customer appointments efficiently with real-time queue tracking,
> role-based access control and Redis caching.

---

## ✨ Features

- 🔐 JWT Authentication
- 📅 Appointment Booking
- 🏢 Staff And Business Management
- 🔄 Real-time Queue Management
- 👥 Role-based Access Management
- ⚡ Redis Caching (50x faster)
- 📊 Queue Status Tracking and Updation

---

## 🔍 Features Breakdown

#### 🔐 JWT Authentication

> Implemented JWT authentication and password hashing for secure login/signup with bcrypt.js

#### 📅 Appointment Booking

> Implemented appointment booking system within a business and related operations.

#### 🏢 Staff And Business Management

> Implemented staff and business management that lets anyone create their business
> and manage their staff according to their roles, assigning staffs to a business
> which lets them handle appointment operations.

#### 🔄 Real-time Queue Management

> Implemented real-time queue management by generating a queue request to the server
> by businessId, returning queues sorted in ascending order by appointment time
> with a queue number for better readability.

#### 👥 Role-based Access Management

> Implemented role-based access management which helps separate the logic of
> Owners, Users and Staffs and their responsibilities, restricting access to
> resources across roles.

##### Relationships

| Role     | Relation    |
| :------- | :---------- |
| Owner    | One to One  |
| Customer | One to One  |
| Staff    | One to Many |

#### ⚡ Redis Caching (50x faster)

> Implemented a caching layer which limits repeated database queries for the same results.
> Also implemented cache invalidation when state changes in the database.

#### 📊 Queue Status Tracking

> Implemented queue status tracking and updation when an appointment is completed or pending.
> Three states exist: `Pending`, `In_Progress`, `Completed` — updatable by staffs only.
> Completed appointments are filtered from the response but kept in the database for records.

---

## 📡 API Endpoints

## Auth

| Method | Endpoint             | Description   | Auth |
| ------ | -------------------- | ------------- | ---- |
| POST   | `/api/auth/register` | Register user | ❌   |
| POST   | `/api/auth/login`    | Login user    | ❌   |

### Business

| Method | Endpoint                   | Description                 | Auth                   |
| ------ | -------------------------- | --------------------------- | ---------------------- |
| POST   | `/api/business/create`     | Create business             | Owner                  |
| GET    | `/api/business/:id`        | Get business by Id          | Staff                  |
| GET    | `/api/business/businesses` | Get businesses of the owner | Owner                  |
| GET    | `/api/business/`           | Get all businesses          | Customer, Owner, Staff |

### Staff

| Method | Endpoint            | Description              | Auth     |
| ------ | ------------------- | ------------------------ | -------- |
| POST   | `/api/staff/create` | Create staff             | Owner    |
| GET    | `/api/staff/:id`    | Get staff by Id          | Owner    |
| GET    | `/api/staff/`       | Get staffs by businessId | Customer |

### Appointments

| Method | Endpoint                       | Description                   | Auth         |
| ------ | ------------------------------ | ----------------------------- | ------------ |
| POST   | `/api/appointment/create`      | Create appointment            | Customer     |
| GET    | `/api/appointment/:id`         | Get appointment by Id         | Owner, staff |
| GET    | `/api/appointment/:businessId` | Get appointment by businessId | staff, owner |

### Queue

| Method | Endpoint                             | Description                                                 | Auth         |
| ------ | ------------------------------------ | ----------------------------------------------------------- | ------------ |
| GET    | `/api/queue/:businessId/generate`    | Create queue                                                | Staff, Owner |
| GET    | `/api/queue/:businessId`             | Get queue by businessId                                     | Owner, staff |
| PATCH  | `/api/queue/:appointmentId/next`     | Update appointment status to `in_Progress` by appointmentId | staff, owner |
| PATCH  | `/api/queue/:appointmentId/complete` | Update appointment status to `complete` by appointmentId    | staff, owner |

## 🛠️ Tech Stack

| Layer     | Technology |
| :-------- | :--------- |
| Runtime   | Node.js    |
| Framework | Express.js |
| Database  | MongoDB    |
| Cache     | Redis      |
| Auth      | JWT        |
| Testing   | k6         |

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/dbname
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_secret_key
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- MongoDB
- Redis

### Installation

```bash
# Clone the repo
git clone https://github.com/Abhrajit-debnath/queue-appointment-system

# Move into project
cd queue-appointment-system

# Install dependencies
npm install

# Start the server
npm run dev
```

---
