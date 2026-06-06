# OTP Service From Scratch

## Overview

This repository documents the process of designing and building a production-grade OTP (One-Time Password) Service from scratch.

The goal is not only to build a working OTP Service but also to understand the engineering decisions, system design principles, scalability challenges, security considerations, and production-readiness requirements behind real-world authentication systems.

This project is being built incrementally while documenting every architectural and implementation decision.

---

## What Is an OTP Service?

An OTP (One-Time Password) Service is responsible for:

* Generating OTPs
* Delivering OTPs
* Verifying OTPs
* Expiring OTPs
* Preventing OTP reuse
* Protecting against brute-force attacks

Common use cases:

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

## Project Goals

Build a production-grade OTP Service capable of:

* Secure OTP Generation
* OTP Verification
* Automatic OTP Expiration
* One-Time OTP Consumption
* Verification Attempt Limiting
* Rate Limiting
* SMS Delivery
* Email Delivery
* Horizontal Scalability
* Production-Ready Monitoring

---

## Learning Objectives

This project focuses on learning:

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

## Phase 3 — MVP Design

Completed:

* OTP Request Model
* API Contract Design
* Redis Key Structure
* Verification Flow Design
* OTP Lifecycle Design
* Edge Case Analysis

Planned APIs:

POST /api/v1/otp/send

POST /api/v1/otp/verify

---

## Phase 4 — Implementation

### Completed

* Node.js Project Initialization
* Express Server Setup
* Environment Configuration
* Layered Folder Structure
* Health Check Endpoint
* Redis Integration
* Redis Connectivity Testing
* Redis TTL Validation
* Dockerized Redis Environment
* OTP Generation Service
* UUID Request ID Generation
* SHA-256 OTP Hashing
* OTP Storage in Redis

### Currently Building

* OTP Verification Service

### Upcoming

* Attempt Tracking
* OTP Consumption
* Request Validation
* Rate Limiting
* SMS Delivery
* Email Delivery

---

# Current Architecture

Client
|
v
Express API
|
+-------------------+
|                   |
v                   v
OTP Generation   OTP Verification
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
* Crypto (SHA-256)

## Planned Additions

* BullMQ
* Docker Compose
* Jest
* Winston
* Monitoring
* Metrics Collection
* Rate Limiting

---

# Engineering Decisions

## Why Redis?

OTPs are:

* Temporary
* Short-Lived
* Frequently Read
* Frequently Deleted

Redis provides:

* Extremely Low Latency
* Native TTL Support
* Automatic Expiration
* Simple Key-Value Storage

---

## Why TTL?

Redis automatically removes expired OTPs.

Example:

OTP Created
↓
TTL = 300 Seconds
↓
Automatic Deletion

Benefits:

* No Cleanup Jobs
* Simpler Architecture
* Better Performance

---

## Why Store OTP Hashes?

OTP values are never stored directly.

Flow:

Generate OTP
↓
Hash OTP
↓
Store Hash

Verification:

User OTP
↓
Hash OTP
↓
Compare Hashes

Benefits:

* Prevents Plaintext Storage
* Reduces Risk During Data Leaks
* Follows Password Storage Principles

---

## Why Use Request IDs?

Instead of verifying:

Email + OTP

we verify:

Request ID + OTP

Benefits:

* Better Traceability
* Cleaner APIs
* Easier Auditing
* Security Isolation

---

# Redis Learning

## Connectivity Testing

Endpoint:

GET /redis-test

Purpose:

* Verify Redis Connection
* Verify Read Operations
* Verify Write Operations

---

## TTL Testing

Endpoint:

GET /ttl-test

Purpose:

* Understand Redis Expiration
* Validate OTP Storage Strategy
* Verify Automatic Cleanup

---

# Available Endpoints

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

## Redis Connectivity Test

GET /redis-test

Response:

```json
{
  "success": true,
  "value": "hello-redis"
}
```

---

## Redis TTL Test

GET /ttl-test

Response:

```json
{
  "success": true,
  "message": "OTP stored for 30 seconds"
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
  "requestId": "9fd9d3d3-62b1-4f35-8c1b-1f0d2e1f6b11",
  "otp": "834291"
}
```

Note:

The OTP is currently returned in the response for development purposes only.

In production it will be delivered through SMS or Email and never returned to the client.

---

# Progress Tracker

## System Design

* [x] Problem Understanding
* [x] Requirements Analysis
* [x] High-Level Design
* [x] Data Modeling
* [x] MVP Design

## Implementation

* [x] Project Setup
* [x] Express Server
* [x] Environment Configuration
* [x] Health Check Endpoint
* [x] Redis Integration
* [x] Redis Connectivity Testing
* [x] Redis TTL Testing
* [x] OTP Generation
* [x] UUID Request ID Generation
* [x] SHA-256 OTP Hashing
* [x] OTP Storage in Redis
* [ ] OTP Verification
* [ ] Attempt Limiting
* [ ] OTP Consumption
* [ ] Request Validation
* [ ] Error Handling

## Production Readiness

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

# Engineering Concepts Learned

## Redis TTL

Redis can automatically delete keys after a specified duration.

Example:

SET otp:key value EX 300

This removes the need for cleanup jobs.

---

## Hashing

OTPs are hashed using SHA-256 before storage.

Benefits:

* No Plaintext Storage
* Better Security
* Industry Standard Practice

---

## Layered Architecture

Request Flow:

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
* Scalable Codebase

---

# Current Milestone

Completed:

* OTP Generation
* Request ID Creation
* OTP Hashing
* Redis Storage
* Automatic Expiration via TTL

Verified:

* Redis Connectivity
* Redis Persistence
* TTL Behavior
* End-to-End OTP Creation Flow

Next Milestone:

POST /api/v1/otp/verify

This endpoint will introduce:

* Hash Comparison
* OTP Verification
* Attempt Tracking
* One-Time OTP Consumption
* Verification Error Handling

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

The focus is on understanding engineering decisions, architecture trade-offs, scalability concerns, and production-grade backend development rather than simply implementing features.
