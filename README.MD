# OTP Service From Scratch

## Overview

This repository documents the process of designing and building a production-grade OTP (One-Time Password) Service from scratch.

The objective is to learn System Design, Backend Engineering, Security, Scalability, and Production Architecture by building a real-world authentication service step by step.

The focus is not just implementation, but understanding the engineering decisions behind each component.

---

# What Is an OTP Service?

An OTP (One-Time Password) Service is responsible for:

* Generating OTPs
* Delivering OTPs
* Verifying OTPs
* Expiring OTPs
* Preventing OTP Reuse
* Limiting Verification Attempts

Common use cases:

* Phone Number Authentication
* Email Verification
* Password Reset
* Multi-Factor Authentication (MFA)
* Banking Transaction Verification

Examples:

* Google
* Amazon
* Uber
* WhatsApp
* Banking Applications

---

# Project Goals

Build a production-grade OTP Service capable of:

* Secure OTP Generation
* OTP Verification
* Automatic Expiration
* One-Time OTP Consumption
* Attempt Limiting
* Rate Limiting
* SMS Delivery
* Email Delivery
* Horizontal Scalability
* Production Monitoring

---

# System Design Journey

## Phase 1 — Problem Understanding

Completed:

* OTP Fundamentals
* Business Requirements
* Functional Requirements
* Non-Functional Requirements
* Security Requirements
* Entity Identification

---

## Phase 2 — System Design Fundamentals

Completed:

* High-Level Architecture
* Request Lifecycle
* Data Flow
* Redis Storage Design
* Security Considerations
* Scalability Considerations

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
Worker
|
v
SMS / Email Provider

---

## Phase 3 — MVP Design

Completed:

* OTP Request Model
* API Design
* Redis Key Design
* OTP Lifecycle Design
* Verification Flow Design
* Edge Case Analysis

---

## Phase 4 — Implementation

### Completed

* Node.js Project Setup
* Express Setup
* Environment Configuration
* Health Check Endpoint
* Redis Integration
* Redis Connectivity Testing
* Redis TTL Testing
* Dockerized Redis Environment
* OTP Generation
* Secure OTP Generation (`crypto.randomInt`)
* UUID Request IDs
* SHA-256 OTP Hashing
* OTP Storage in Redis
* OTP Verification
* Attempt Tracking
* OTP Consumption
* Validation Middleware

### Currently Building

* Production Hardening

### Upcoming

* Rate Limiting
* Structured Logging
* Custom Error Handling
* Monitoring
* SMS Delivery
* Email Delivery

---

# Current Architecture

Client
|
v
Validation Middleware
|
v
Controller
|
v
Service Layer
|
v
Redis

---

# Project Structure

```text
otp-service/
│
├── src/
│   ├── config/
│   │   └── redis.js
│   │
│   ├── controllers/
│   │   └── otp.controller.js
│   │
│   ├── middleware/
│   │   └── otp.validation.js
│   │
│   ├── routes/
│   │   └── otp.routes.js
│   │
│   ├── services/
│   │   └── otp.service.js
│   │
│   ├── utils/
│   │   ├── otp.js
│   │   └── hash.js
│   │
│   └── server.js
│
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

# Technology Stack

## Backend

* Node.js
* Express.js

## Storage

* Redis

## Infrastructure

* Docker

## Security

* SHA-256 Hashing
* Cryptographically Secure OTP Generation

## Utilities

* UUID
* Dotenv

---

# Implemented APIs

## Health Check

```http
GET /health
```

Response:

```json
{
  "success": true,
  "message": "OTP Service Healthy"
}
```

---

## Generate OTP

```http
POST /api/v1/otp/send
```

Request:

```json
{
  "target": "user@example.com"
}
```

Response:

```json
{
  "success": true,
  "requestId": "uuid",
  "otp": "834291"
}
```

Note:

OTP is returned only for development purposes.

In production it will be delivered through SMS or Email.

---

## Verify OTP

```http
POST /api/v1/otp/verify
```

Request:

```json
{
  "requestId": "uuid",
  "otp": "834291"
}
```

Response:

```json
{
  "success": true,
  "verified": true
}
```

---

# OTP Lifecycle

OTP Creation:

Generate OTP
↓
Hash OTP
↓
Store Hash
↓
TTL = 300 Seconds

Verification:

User OTP
↓
Hash OTP
↓
Compare Hashes
↓
Delete OTP

Expiration:

TTL Expires
↓
Redis Deletes Key

---

# Security Features

## Secure OTP Generation

Uses:

```javascript
crypto.randomInt()
```

instead of:

```javascript
Math.random()
```

Benefits:

* Cryptographically Secure
* Suitable for Authentication Systems
* Industry Standard

---

## OTP Hashing

Stored:

```text
SHA256(OTP)
```

instead of:

```text
123456
```

Benefits:

* No Plaintext Storage
* Reduced Risk During Data Breaches

---

## One-Time Usage

Successful Verification:

Verify OTP
↓
Delete Redis Key

Prevents OTP Reuse.

---

## Attempt Tracking

Failed Attempts:

```text
attempts++
```

After:

```text
attempts >= 5
```

Verification is blocked.

---

## Automatic Expiration

Redis TTL automatically removes expired OTPs.

No cleanup jobs required.

---

# Engineering Concepts Learned

## Layered Architecture

Request
↓
Route
↓
Middleware
↓
Controller
↓
Service
↓
Redis

Benefits:

* Separation of Concerns
* Easier Testing
* Better Maintainability

---

## Validation Middleware

Validation occurs before business logic.

Benefits:

* Cleaner Controllers
* Reusable Validation Logic
* Better API Design

---

## Redis TTL

Example:

```redis
SET otp:key value EX 300
```

Benefits:

* Automatic Cleanup
* Simpler Architecture

---

# Progress Tracker

## Core OTP System

* [x] OTP Generation
* [x] Secure OTP Generation
* [x] OTP Hashing
* [x] OTP Storage
* [x] OTP Verification
* [x] Attempt Tracking
* [x] OTP Consumption
* [x] Automatic Expiration

## API Infrastructure

* [x] Express Setup
* [x] Redis Integration
* [x] Validation Middleware
* [x] Dockerized Development Environment

## Production Hardening

* [ ] Rate Limiting
* [ ] Structured Logging
* [ ] Custom Error Classes
* [ ] Monitoring
* [ ] Metrics Collection

## Future Features

* [ ] SMS Integration
* [ ] Email Integration
* [ ] Queue System
* [ ] Worker Service
* [ ] Resend OTP
* [ ] OTP Status API

---

# Current Milestone

Core OTP Workflow Complete

Implemented:

* OTP Generation
* OTP Verification
* OTP Consumption
* Attempt Tracking
* TTL Expiration
* Validation Middleware

Next Milestone:

Production Hardening

Upcoming Topics:

* Rate Limiting
* Structured Logging
* Error Handling
* Monitoring
* Observability

---

# Running The Project

Install dependencies:

```bash
npm install
```

Start Redis:

```bash
docker start otp-redis
```

Run application:

```bash
npm run dev
```

---

# Purpose

This repository serves as a public engineering journal documenting the complete journey of designing and building a production-grade OTP Service from scratch.

The emphasis is on understanding architecture, security, scalability, reliability, and production-grade backend engineering rather than simply implementing features.
