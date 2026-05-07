# Vocabulary Service (`lifeops-vocabulary-service`)

## Service Description

Vocabulary Service is an independent LifeOps module for managing vocabulary records and review workflows within a space.

## Core Scope (v1)

- manage words and translations
- track learning statuses (`new`, `learning`, `known`, `archived`)
- store review entries and due-review queue
- provide summary counters for dashboard usage

## Platform Integration Contract

This service is integrated through Platform Core connector runtime and must:

- validate internal bearer token on authenticated routes
- validate required context headers:
  - `X-User-Id`
  - `X-Space-Id`
  - `X-Request-Id`
  - `X-Correlation-Id`
  - `X-Locale`
  - `X-Timezone`
- enforce strict `space_id` data isolation
- return standard API envelopes for list, item, and error responses

## Required Endpoints

- `GET /health` -> `{"status": "ok"}`
- `GET /meta`
- `GET /capabilities`

## Status

- lifecycle: `planned`
- module_id: `vocabulary`

## Stack

- Runtime: Node.js LTS
- Language: TypeScript
- API framework: Fastify
- Persistence: SQLite (introduced in the persistence slice)
- Tests: Vitest + Supertest

## Local Setup

Install dependencies:

```bash
make install
```

Create a local environment file:

```bash
cp .env.example .env
```

Run the service:

```bash
make run
```

The health endpoint must return exactly:

```json
{"status":"ok"}
```

## Verification

Run tests:

```bash
make test
```

Run lint checks:

```bash
make lint
```

Run TypeScript type checks:

```bash
make build
```
