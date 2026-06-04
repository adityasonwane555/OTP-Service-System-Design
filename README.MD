# OTP Service From Scratch

## Overview

This repository documents the process of designing and building a production-grade OTP (One-Time Password) Service from scratch.

The goal is not only to build a working application but also to understand the engineering decisions behind real-world authentication systems used by companies at scale.

This project follows a structured System Design approach, progressing from problem understanding to production-ready architecture.

---

## What Is an OTP Service?

An OTP (One-Time Password) Service generates, delivers, verifies, and expires temporary authentication codes used for:

* Phone Number Authentication
* Email Verification
* Password Reset Flows
* Two-Factor Authentication (2FA)
* Banking and Transaction Verification

Examples include:

* WhatsApp
* Uber
* Google
* Amazon
* Banking Applications

---

## Project Goals

Build an OTP Service capable of:

* Generating OTPs
* Verifying OTPs
* OTP expiration handling
* Single-use OTP enforcement
* Brute-force protection
* Request tracking
* Production-grade scalability
* Security best practices

---

## Learning Objectives

This project is focused on learning:

* System Design
* Backend Engineering
* Authentication Systems
* Security Fundamentals
* Redis
* Distributed Systems
* Scalability
* Reliability
* Production Architecture

---

## System Design Journey

### Phase 1 — Problem Understanding

Completed:

* OTP fundamentals
* Real-world use cases
* Business requirements
* Functional requirements
* Non-functional requirements
* Security considerations

---

### Phase 2 — System Design Fundamentals

Completed:

* High-level architecture
* Request lifecycle
* Core components
* Data flow
* Redis storage design
* Scalability considerations
* Security architecture

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

### Phase 3 — MVP Design

Completed:

* API contract design
* OTP Request entity modeling
* Redis key structure
* OTP lifecycle design
* Verification algorithm
* Edge case analysis

Core APIs:

POST /api/v1/otp/send

POST /api/v1/otp/verify

---

### Phase 4 — Implementation

Current Progress:

Completed:

* Project initialization
* Express setup
* Environment configuration
* Layered architecture setup
* Health check endpoint

In Progress:

* Redis integration

Upcoming:

* OTP generation
* OTP hashing
* OTP storage
* OTP verification
* Request validation

---

## MVP Architecture

Client
|
v
Express API
|
v
Redis

---

## Current Project Structure

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
│   ├── services/
│   │   └── otp.service.js
│   │
│   ├── routes/
│   │   └── otp.routes.js
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

## Planned Tech Stack

### Backend

* Node.js
* Express.js

### Storage

* Redis

### Utilities

* UUID
* Dotenv

### Future Additions

* BullMQ
* Docker
* Jest
* Winston
* Rate Limiting
* Monitoring
* Metrics Collection

---

## Security Decisions

Current Security Design:

* OTPs are hashed before storage
* OTPs expire automatically using Redis TTL
* OTPs are single-use
* Verification attempts are limited
* Request IDs are used instead of exposing user identifiers

Future Security Enhancements:

* Rate Limiting
* Abuse Detection
* IP-based Controls
* Audit Logging

---

## Engineering Decisions

### Why Redis?

* Extremely fast
* Native expiration support
* Ideal for temporary authentication data

### Why Hash OTPs?

If storage is compromised, attackers should not be able to read OTP values.

### Why Request IDs?

Request IDs provide:

* Better traceability
* Cleaner APIs
* Improved security boundaries

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
* [ ] Redis Integration
* [ ] OTP Generation
* [ ] OTP Storage
* [ ] OTP Verification
* [ ] Request Validation
* [ ] Error Handling

### Production Readiness

* [ ] Queue System
* [ ] Worker Service
* [ ] SMS Provider Integration
* [ ] Email Provider Integration
* [ ] Rate Limiting
* [ ] Logging
* [ ] Monitoring
* [ ] Docker
* [ ] CI/CD

---

## Running The Project

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Health check:

```http
GET /health
```

Expected response:

```json
{
  "success": true,
  "message": "OTP Service Healthy"
}
```

---

## Purpose

This repository serves as a public engineering journal documenting the complete journey of designing and building a production-grade OTP Service.

The emphasis is on understanding the reasoning behind every engineering and system design decision rather than simply implementing features.
