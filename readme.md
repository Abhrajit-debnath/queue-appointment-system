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
- ✅ Field Validation

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
> Owners, Customers and Staffs and their responsibilities, restricting access to
> resources across roles.

##### Relationships

| Role     | Relation    | Reason                             |
| :------- | :---------- | :--------------------------------- |
| Owner    | One to One  | One owner has one business         |
| Customer | One to Many | One customer has many appointments |
| Staff    | One to Many | One business has many staffs       |

#### ⚡ Redis Caching (50x faster)

> Implemented a caching layer which limits repeated database queries for the same results.
> Also implemented cache invalidation when state changes in the database.

#### 📊 Queue Status Tracking

> Implemented queue status tracking and updation when an appointment is completed or pending.
> Three states exist: `Pending`, `In_Progress`, `Completed` — updatable by staffs only.
> Completed appointments are filtered from the response but kept in the database for records.

#### ✅ Field Validation

> Implemented schema validation on fields using express-validator for validating client inputs efficiently.

---

## 📡 API Endpoints

### Auth

| Method | Endpoint             | Description   | Auth |
| ------ | -------------------- | ------------- | ---- |
| POST   | `/api/auth/register` | Register user | ❌   |
| POST   | `/api/auth/login`    | Login user    | ❌   |

### Business

| Method | Endpoint                   | Description                 | Auth                   |
| ------ | -------------------------- | --------------------------- | ---------------------- |
| POST   | `/api/business/create`     | Create business             | Owner                  |
| GET    | `/api/business/:id`        | Get business by Id          | Staff, customer        |
| GET    | `/api/business/businesses` | Get businesses of the owner | Owner                  |
| GET    | `/api/business/`           | Get all businesses          | Customer, Owner, Staff |

### Staff

| Method | Endpoint            | Description              | Auth         |
| ------ | ------------------- | ------------------------ | ------------ |
| POST   | `/api/staff/create` | Create staff             | Owner        |
| GET    | `/api/staff/:id`    | Get staff by Id          | Owner, staff |
| GET    | `/api/staff/`       | Get staffs by businessId | Owner        |

### Appointments

| Method | Endpoint                       | Description                   | Auth         |
| ------ | ------------------------------ | ----------------------------- | ------------ |
| POST   | `/api/appointment/create`      | Create appointment            | Customer, staff     |
| GET    | `/api/appointment/`         | Get appointment by userId         | customer |
| GET    | `/api/appointment/:businessId` | Get appointment by businessId | Staff, Owner |

### Queue

| Method | Endpoint                             | Description                                                 | Auth         |
| ------ | ------------------------------------ | ----------------------------------------------------------- | ------------ |
| GET    | `/api/queue/:businessId/generate`    | Create queue                                                | Staff, Owner |
| GET    | `/api/queue/:businessId`             | Get queue by businessId                                     | Owner, Staff |
| PATCH  | `/api/queue/:appointmentId/next`     | Update appointment status to `in_Progress` by appointmentId | Staff, Owner |
| PATCH  | `/api/queue/:appointmentId/complete` | Update appointment status to `complete` by appointmentId    | Staff, Owner |

---

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

## 🔮 Improvements
