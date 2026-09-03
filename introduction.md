---
title: Introduction
description: COGEXT tracks commitments made in conversations and monitors whether they are fulfilled.
---

# Introduction

COGEXT is a commitment intelligence API. It detects promises, obligations, and commitments made in text (emails, Slack messages, call transcripts, support tickets) and tracks them through their full lifecycle until they are fulfilled, failed, or cancelled.

## How it works

**1. Detect**: Send any text to the `/commitments/track` endpoint. COGEXT extracts all commitments it finds, assigns each a unique ID, and normalizes deadlines to UTC.

**2. Monitor**: Each commitment moves through a 12-state lifecycle automatically (`DETECTED → OPEN → DUE → OVERDUE`). You don't manage timers: COGEXT does.

**3. Alert**: Receive webhook events the moment commitments change state, go overdue, or need human review.

## Key capabilities

- Extract commitments from unstructured text with confidence scoring (0–1)
- Normalize deadlines to UTC regardless of how they were expressed ("by EOD Friday", "next week", "in 3 days")
- Track evidence for or against fulfillment
- Receive real-time HMAC-signed webhook events on all state transitions
- Filter and query commitments by state, source, recipient, and deadline
- Python and TypeScript SDKs included

## Where to go next

| | |
|---|---|
| [Quickstart](/quickstart) | Track your first commitment in under 5 minutes |
| [Commitments model](/core-concepts/commitments) | Understand what COGEXT extracts from text |
| [Lifecycle](/core-concepts/lifecycle) | The 12 states a commitment moves through |
| [API Reference](/api-reference/track) | Full endpoint documentation |
| [SDKs](/sdks/python) | Python and TypeScript libraries |
