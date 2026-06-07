# OTP Service From Scratch

## Overview

This repository documents the process of designing and building a production-grade OTP (One-Time Password) Service from scratch.

The goal is to learn System Design, Backend Engineering, Authentication Systems, Security, Scalability, and Production Readiness by building a real-world OTP service step by step.

This project focuses on understanding not only how to build a system, but why engineering decisions are made.

---

## What Is an OTP Service?

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
* Two-Factor Authentication (2FA)
* Banking Transaction Verification

---

## Project Goals

Build a production-grade OTP Service capable of:

* Secure OTP Generation
* OTP Verification
* Automatic OTP Expiration
* One-Time OTP Consumption
* Verification Attempt Limiting
* SMS Delivery
* Email Delivery
* Rate Limiting
* Horizontal Scaling
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
* Core Entity Identification

---

## Phase 2 — System Design Fundamentals

Completed:

* High-Level Architecture
* Request Lifecycle
* Data Flow
* Storage Design
* Security Design
* Scalability Considerations

Architecture:

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

## Phase 3 — MVP Design

Completed:

* OTP Request Model
* API Contract Design
* Redis Key Structure
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
* Redis TTL Validation
* Dockerized Redis Environment
* OTP Generation
* UUID Request ID Generation
* SHA-256 OTP Hashing
* OTP Storage in Redis
* OTP Verification
* Attempt Tracking
* OTP Consumption
* Automatic OTP Expiration

### Currently Building

* Production Hardening

### Upcoming

* Validation Middleware
* Secure OTP Generation
* Rate Limiting
* Logging
* Monitoring
* SMS Delivery
* Email Delivery

---

# Current Architecture

Client
|
v
Express API
|
+-----------------------+
|                       |
v                       v
OTP Generation      OTP Verification
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

## Utilities

* UUID
* Dotenv
* Node.js Crypto

---

# Implemented APIs

## Health Check

GET /health

Response:

```json
{
  "success": true,
  "message": "OTP Service Healthy"
}
```

---

## Generate OTP

POST /api/v1/otp/send

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

The OTP is currently returned for development and testing purposes only.

In production it will be sent via SMS or Email.

---

## Verify OTP

POST /api/v1/otp/verify

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

# Current OTP Lifecycle

OTP Creation:

Generate OTP
↓
Hash OTP
↓
Store Hash
↓
Redis TTL (300 sec)

Verification:

User OTP
↓
Hash OTP
↓
Compare Hashes
↓
Success
↓
Delete OTP

Expiration:

OTP Created
↓
TTL Reaches Zero
↓
Redis Deletes Key

---

# Security Features Implemented

## OTP Hashing

OTP values are never stored directly.

Stored:

```text
SHA256(OTP)
```

instead of:

```text
123456
```

---

## One-Time Usage

Successful verification:

```text
Verify OTP
↓
Delete Redis Key
```

Prevents OTP reuse.

---

## Attempt Tracking

Failed verifications increment:

```text
attempts
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

# Progress Tracker

## System Design

* [x] Problem Understanding
* [x] Requirements Analysis
* [x] High-Level Design
* [x] Data Modeling
* [x] MVP Design

## Implementation

* [x] Express Setup
* [x] Redis Integration
* [x] OTP Generation
* [x] UUID Request IDs
* [x] SHA-256 Hashing
* [x] OTP Storage
* [x] OTP Verification
* [x] Attempt Tracking
* [x] OTP Consumption
* [x] Automatic Expiration
* [ ] Validation Middleware
* [ ] Structured Logging
* [ ] Rate Limiting
* [ ] Custom Error Handling

## Production Readiness

* [ ] Queue System
* [ ] Worker Service
* [ ] SMS Integration
* [ ] Email Integration
* [ ] Monitoring
* [ ] Metrics
* [ ] Docker Compose
* [ ] CI/CD

---

# Engineering Concepts Learned

## Redis TTL

Redis automatically expires OTPs after a configured duration.

Example:

SET otp:key value EX 300

Benefits:

* No cleanup jobs
* Simpler architecture
* Better performance

---

## Hash-Based Verification

Stored:

SHA256(OTP)

Verification:

SHA256(User OTP)
↓
Compare Hashes

Same principle used in password authentication systems.

---

## Layered Architecture

Route
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
* Easier Scaling

---

# Current Milestone

Core OTP Workflow Complete

Implemented:

* OTP Generation
* OTP Hashing
* OTP Storage
* OTP Verification
* Attempt Tracking
* OTP Consumption
* Automatic Expiration

Next Milestone:

Production Hardening

Planned Improvements:

* crypto.randomInt()
* Validation Middleware
* Custom Error Classes
* Structured Logging
* Rate Limiting
* Better Error Responses

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

Run the application:

```bash
npm run dev
```

---

# Purpose

This repository serves as a public engineering journal documenting the complete journey of designing and building a production-grade OTP Service from scratch.

The focus is on understanding architecture, engineering trade-offs, scalability, security, and production-grade backend development rather than simply implementing features.
