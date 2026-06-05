# OTP Service From Scratch

## Overview

This repository documents the process of designing and building a production-grade OTP (One-Time Password) Service from scratch.

The objective is not only to build a working OTP Service but also to understand the system design, backend engineering, scalability, reliability, and security principles behind authentication systems used by real-world companies.

This project is being developed incrementally, following a structured engineering approach from problem understanding to production readiness.

---

## Project Goals

Build a production-grade OTP Service capable of:

* Generating OTPs
* Verifying OTPs
* Managing OTP expiration
* Preventing OTP reuse
* Limiting verification attempts
* Supporting future SMS and Email delivery
* Scaling horizontally
* Following security best practices

---

## Real-World Use Cases

* Phone Number Authentication
* Email Verification
* Password Reset
* Two-Factor Authentication (2FA)
* Banking Transaction Verification

Examples:

* WhatsApp
* Uber
* Google
* Amazon
* Banking Applications

---

## System Design Journey

### Phase 1 — Problem Understanding

Completed:

* OTP Fundamentals
* Business Requirements
* Functional Requirements
* Non-Functional Requirements
* Security Requirements
* Core Entity Identification

---

### Phase 2 — System Design Fundamentals

Completed:

* High-Level Architecture
* Request Lifecycle
* Data Flow
* Redis Storage Strategy
* Scalability Considerations
* Security Considerations

High-Level Architecture:

Client
|
v
OTP API
|
v
Redis
|
v
Queue
|
v
Worker Service
|
v
SMS / Email Provider

---

### Phase 3 — MVP Design

Completed:

* OTP Request Model
* API Design
* Redis Key Design
* OTP Lifecycle Design
* Verification Algorithm
* Edge Case Analysis

Planned APIs:

POST /api/v1/otp/send

POST /api/v1/otp/verify

---

### Phase 4 — Implementation

Current Progress:

Completed:

* Node.js Project Initialization
* Express Setup
* Environment Configuration
* Layered Folder Structure
* Health Check Endpoint
* Redis Integration
* Redis Connectivity Testing
* Redis TTL Validation
* Dockerized Redis Environment

Currently Building:

* OTP Generation Service

Upcoming:

* OTP Hashing
* OTP Storage
* OTP Verification
* Request Validation

---

## Current Architecture

Client
|
v
Express API
|
v
Redis

---

## Project Structure

```text
otp-service/
│
├── src/
│   ├── config/
│   │   └── redis.js
│   │
│   ├── controllers/
│   │
│   ├── routes/
│   │
│   ├── services/
│   │
│   ├── utils/
│   │
│   └── server.js
│
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

## Technology Stack

### Backend

* Node.js
* Express.js

### Storage

* Redis

### Infrastructure

* Docker

### Utilities

* UUID
* Dotenv

### Planned Additions

* BullMQ
* Jest
* Winston
* Docker Compose
* Monitoring
* Metrics
* Rate Limiting

---

## Engineering Decisions

### Why Redis?

OTPs are:

* Temporary
* Short-Lived
* Frequently Accessed
* Frequently Deleted

Redis provides:

* Extremely Low Latency
* Native TTL Support
* Automatic Expiration
* Simple Data Model

---

### Why Use TTL?

Redis automatically removes expired OTPs.

Example:

```text
OTP Created
      ↓
TTL = 300 seconds
      ↓
Automatic Deletion
```

No cleanup jobs required.

---

### Why Hash OTPs?

OTP values should never be stored in plaintext.

Future implementation:

```text
Generate OTP
      ↓
Hash OTP
      ↓
Store Hash
```

This prevents OTP disclosure if storage is compromised.

---

### Why Request IDs?

Request IDs provide:

* Better Traceability
* Cleaner APIs
* Security Isolation
* Easier Auditing

---

## Redis Learning

Implemented:

### Connectivity Test

Endpoint:

GET /redis-test

Purpose:

* Verify Redis Connection
* Verify Read Operations
* Verify Write Operations

---

### TTL Test

Endpoint:

GET /ttl-test

Purpose:

* Verify Expiration Mechanism
* Understand Redis TTL Behavior
* Validate OTP Storage Strategy

---

## Progress Tracker

### System Design

* [x] Problem Understanding
* [x] Requirements Analysis
* [x] High-Level Design
* [x] Data Modeling
* [x] MVP Design

### Implementation

* [x] Project Setup
* [x] Express Server
* [x] Environment Configuration
* [x] Health Check Endpoint
* [x] Redis Integration
* [x] Redis Connectivity Testing
* [x] Redis TTL Testing
* [ ] OTP Generation
* [ ] OTP Hashing
* [ ] OTP Storage
* [ ] OTP Verification
* [ ] Request Validation
* [ ] Error Handling

### Production Readiness

* [ ] Queue System
* [ ] Worker Service
* [ ] SMS Integration
* [ ] Email Integration
* [ ] Rate Limiting
* [ ] Logging
* [ ] Monitoring
* [ ] Docker Compose
* [ ] CI/CD

---

## Running the Project

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

---

## Available Endpoints

### Health Check

GET /health

Response:

```json
{
  "success": true,
  "message": "OTP Service Healthy"
}
```

---

### Redis Connectivity Test

GET /redis-test

Response:

```json
{
  "success": true,
  "value": "hello-redis"
}
```

---

### Redis TTL Test

GET /ttl-test

Response:

```json
{
  "success": true,
  "message": "OTP stored for 30 seconds"
}
```

---

## Current Milestone

Completed:

* Express Application Setup
* Redis Integration
* Dockerized Development Environment
* Redis TTL Verification

Next Milestone:

Build the first real OTP API:

POST /api/v1/otp/send

This endpoint will:

* Generate Secure OTPs
* Generate Request IDs
* Hash OTPs
* Store OTPs in Redis
* Apply TTL Expiration

---

## Purpose

This repository serves as a public engineering journal documenting the complete journey of designing and building a production-grade OTP Service from scratch.

The focus is on understanding engineering decisions and system design trade-offs rather than simply implementing features.
