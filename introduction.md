---
title: Introduction
description: COGEXT tracks commitments made in conversations and monitors whether they are fulfilled.
---

# Introduction

COGEXT is a commitment intelligence API. It detects promises, obligations, and commitments made in text (emails, Slack messages, agent outputs, call transcripts, support tickets) and tracks them through their full lifecycle until they are fulfilled, failed, or cancelled.

## How it works

**1. Detect**: Send any text to the `/ingest` endpoint. COGEXT extracts all commitments it finds, classifies each by shape, generates a verifier query, resolves deadlines in the actor's local timezone, and assigns each commitment a unique ID.

**2. Route**: Each commitment is immediately routed to either `open` or `pending_review` based on its shape and confidence. External commitments (ones that cause real-world effects) always go to `pending_review` first — a human confirms before they go active.

**3. Monitor**: Each commitment moves through a 12-state lifecycle automatically (`detected → open → due → overdue`). You don't manage timers: COGEXT does.

**4. Verify**: When a commitment is fulfilled, COGEXT checks for evidence before accepting the transition. External commitments require a verified evidence score ≥ 0.7 — agents cannot self-report completion.

**5. Alert**: Receive webhook events the moment commitments change state, go overdue, or need human review.

## Key capabilities

- Extract commitments from unstructured text with confidence scoring (0–1)
- Classify each commitment as `external_side_effect` or `logged_intent` — two different trust levels
- Generate a `verifier_query` at extraction time: a plain-English description of how to independently confirm the commitment happened
- Resolve deadlines in the actor's local timezone ("by EOD Friday" in IST resolves correctly, not as UTC)
- Block fulfillment of external commitments without sufficient evidence (score ≥ 0.7)
- Track evidence for or against fulfillment
- Receive real-time HMAC-signed webhook events on all state transitions
- Filter and query commitments by state, shape, source, recipient, and deadline
- Python and TypeScript SDKs included

## The core distinction: executed vs. planned

Half of all agent failure modes come from not knowing whether something was **actually executed** or just **planned in the context window**.

COGEXT solves this by classifying every commitment at extraction time:

- **`external_side_effect`** — the action left the agent's context and touched the real world: an email was sent, code was deployed, an API was called. These can be independently verified and require evidence before marking done.
- **`logged_intent`** — the action is internal: a decision was recorded, a note was made, agent state was updated. These are complete when the agent says so.

This distinction is enforced at every step: routing, review, and fulfillment.

## Where to go next

| | |
|---|---|
| [Quickstart](/quickstart) | Track your first commitment in under 5 minutes |
| [Commitments model](/core-concepts/commitments) | Fields, shapes, verifier queries, and timezone-aware deadlines |
| [Lifecycle](/core-concepts/lifecycle) | The 12 states, routing logic, and evidence gate |
| [Evidence](/core-concepts/evidence) | How to submit and score evidence |
| [API Reference](/api-reference/track) | Full endpoint documentation |
| [SDKs](/sdks/python) | Python and TypeScript libraries |
