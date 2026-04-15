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
