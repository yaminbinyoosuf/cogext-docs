---
title: Introduction
description: The accountability layer for machine intelligence. COGEXT tracks every commitment AI agents make and verifies whether they are kept.
---

# Introduction

COGEXT is the accountability layer for machine intelligence. It detects promises, obligations, and commitments made in text — agent outputs, emails, Slack messages, call transcripts — and tracks them through their full lifecycle until fulfilled, failed, or cancelled.

Every commitment is a first-class object with a risk score, a verifier query, an evidence gate, and a tamper-evident audit receipt.

## How it works

**1. Detect** — Send any text to `/ingest`. COGEXT extracts all commitments, classifies each by shape, scores risk, generates a verifier query, resolves deadlines in the actor's local timezone, and assigns a unique ID.

**2. Route** — Each commitment goes to `open` or `pending_review` based on shape and confidence. `external_side_effect` commitments always start as `pending_review` — a human or Kill Switch confirms before they go active.

**3. Monitor** — Each commitment moves through a 12-state lifecycle automatically (`detected → open → due → overdue`). You don't manage timers.

**4. Verify** — When a commitment is fulfilled, COGEXT checks evidence before accepting the transition. External commitments require a verified evidence score ≥ 0.7 — agents cannot self-report completion.

**5. Alert** — Receive webhook events the moment commitments change state, go overdue, contradict each other, or cross the risk threshold.

## v2.0 Capabilities

| Feature | Description |
|---|---|
| **Contradiction Radar** | Automatically detects when a new commitment conflicts with a live one — same action, different object or recipient |
| **Failure Predictor** | Scores every commitment across 5 risk factors at ingest; fires `risk.high` webhook at ≥ 0.70 |
| **Public Audit Receipt** | HMAC-SHA256 receipt token for any commitment — share a URL to prove the record is authentic and untampered |
| **Verifier Engine** | Evidence adapter system (Gmail, webhooks) scores relevance; auto-transitions to `fulfilled` at ≥ 0.70 |
| **Kill Switch** | Every `external_side_effect` commitment triggers a Slack alert with Approve / Cancel buttons before execution proceeds |

## The core distinction: executed vs. planned

Half of all agent failure modes come from not knowing whether something was **actually executed** or just **planned in the context window**.

COGEXT classifies every commitment at extraction:

- **`external_side_effect`** — the action touches the real world: an email sent, code deployed, an API called. Requires independent evidence before marking done.
- **`logged_intent`** — the action is internal: a decision recorded, a note made, agent state updated. Complete when the agent says so.

This distinction is enforced at every step: routing, review, Kill Switch, and fulfillment.

## Where to go next

| | |
|---|---|
| [Quickstart](/quickstart) | Track your first commitment in under 5 minutes |
| [Commitments model](/core-concepts/commitments) | Fields, shapes, risk scores, verifier queries, deadlines |
| [Lifecycle](/core-concepts/lifecycle) | The 12 states, routing logic, and evidence gate |
| [Evidence](/core-concepts/evidence) | How to submit and score evidence |
| [Audit Receipts](/core-concepts/audit-receipts) | HMAC-signed tamper-evident records |
| [API Reference](/api-reference/track) | Full endpoint documentation |
| [SDKs](/sdks/python) | Python and TypeScript libraries |
