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

- 🔐 JWT Authentication with refresh tokens
- 🛡️ Rate Limiting
- 🪖 Helmet Security
- 📅 Appointment Booking
- 🏢 Staff And Business Management
- 🔄 Real-time Queue Management
- 👥 Role-based Access Management
- ⚡ Redis Caching (50x faster)
- 📊 Queue Status Tracking and Updation
- ✅ Field Validation

---

## 🔍 Features Breakdown

#### 🔐 JWT Authentication With Refresh Token

> Implemented JWT authentication with short-lived access tokens (15m) and long-lived refresh tokens (7d) for better security, along with password hashing using bcrypt.js for secure login/signup.

#### 🛡️ Rate Limiting

> Implemented rate limiting with express-rate-limiter for all routes upto 50 request per 10 mins

#### 🪖 Helmet Security

> Implemented helmet security middleware to protect against common web vulnerabilities like XSS, clickjacking, and MIME type sniffing by setting secure HTTP headers.

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

| Method | Endpoint                       | Description                   | Auth            |
| ------ | ------------------------------ | ----------------------------- | --------------- |
| POST   | `/api/appointment/create`      | Create appointment            | Customer, staff |
| GET    | `/api/appointment/`            | Get appointment by userId     | customer        |
| GET    | `/api/appointment/:businessId` | Get appointment by businessId | Staff, Owner    |

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
ACCESS_SECRET=your_access_secret
REFRESH_SECRET=your_refresh_secret
```

---

## 🚀 Getting Started

## 🐳 Run with Docker (Recommended)
- The entire stack (Node.js, MongoDB, Redis) is containerized for an instant "it works on my machine" experience.

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

### Performance

> Improved performance of queue route by implementing caching with redis tested with grafana k6

#### Results

##### Before caching

```
█ TOTAL RESULTS

    checks_total.......: 1131    94.763297/s
    checks_succeeded...: 100.00% 1131 out of 1131
    checks_failed......: 0.00%   0 out of 1131

    ✓ status is 200

    HTTP
    http_req_duration..............: avg=1.88s min=126.6ms  med=1.93s max=4.26s p(90)=2.16s p(95)=2.4s
      { expected_response:true }...: avg=1.88s min=126.6ms  med=1.93s max=4.26s p(90)=2.16s p(95)=2.4s
    http_req_failed................: 0.00%  0 out of 1131
    http_reqs......................: 1131   94.763297/s

    EXECUTION
    iteration_duration.............: avg=1.88s min=127.79ms med=1.93s max=4.26s p(90)=2.16s p(95)=2.4s
    iterations.....................: 1131   94.763297/s
    vus............................: 95     min=95        max=200
    vus_max........................: 200    min=200       max=200

    NETWORK
    data_received..................: 697 kB 58 kB/s
    data_sent......................: 357 kB 30 kB/s




running (11.9s), 000/200 VUs, 1131 complete and 0 interrupted iterations
default ✓ [======================================] 200 VUs  10s

```

##### After Caching

```
HTTP
http_req_duration..............: avg=42.6ms  min=4.64ms med=40.42ms max=1.26s p(90)=45.76ms p(95)=47.52ms
{ expected_response:true }...: avg=42.6ms  min=4.64ms med=40.42ms max=1.26s p(90)=45.76ms p(95)=47.52ms
http_req_failed................: 0.00% 0 out of 46853
http_reqs......................: 46853 4678.477878/s

    EXECUTION
    iteration_duration.............: avg=42.69ms min=4.73ms med=40.5ms  max=1.26s p(90)=45.84ms p(95)=47.6ms
    iterations.....................: 46853 4678.477878/s
    vus............................: 200   min=200        max=200
    vus_max........................: 200   min=200        max=200

    NETWORK
    data_received..................: 28 MB 2.8 MB/s
    data_sent......................: 15 MB 1.5 MB/s

running (10.0s), 000/200 VUs, 46853 complete and 0 interrupted iterations
default ✓ [======================================] 200 VUs 10s
```

### Summary Table

| Metric               | Before Cache | After Cache | Improvement |
| -------------------- | ------------ | ----------- | ----------- |
| Throughput           | 94 req/s     | 4,678 req/s | 49x faster  |
| Avg Response         | 1.88s        | 42.6ms      | 44x faster  |
| p(95)                | 2.4s         | 47.52ms     | 50x faster  |
| Total Requests (10s) | 1,131        | 46,853      | 41x more    |
