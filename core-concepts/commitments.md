---
title: Commitments
description: The core data model — what COGEXT extracts from text.
---

# Commitments

## What is a commitment?

A commitment is a promise, obligation, or task extracted from unstructured text. COGEXT parses the following fields from natural language:

| Field | Description | Example |
|-------|-------------|---------|
| `id` | Unique commitment ID | `cmt_abc123` |
| `action` | The verb — what will be done | `send`, `schedule`, `review` |
| `object` | What the action applies to | `the report`, `a meeting`, `your PR` |
| `recipient` | Who the commitment is made to | `you`, `the team`, `Sarah` |
| `deadline_raw` | Deadline as expressed in source text | `by Friday`, `end of month` |
| `deadline_normalized_utc` | Deadline in ISO 8601 UTC | `2024-01-19T23:59:59Z` |
| `confidence` | Extraction confidence score (0–1) | `0.97` |
| `state` | Current lifecycle state | `OPEN`, `FULFILLED` |
| `source` | Where the text came from | `email`, `slack`, `transcript` |
| `source_id` | Your identifier for the origin message | `msg_001` |

## Example extraction

Input text:
```
"I'll get you the contract draft by Thursday EOD."
```

Extracted commitment:
```json
{
  "id": "cmt_abc123",
  "action": "get",
  "object": "the contract draft",
  "recipient": "you",
  "deadline_raw": "by Thursday EOD",
  "deadline_normalized_utc": "2024-01-18T23:59:59Z",
  "confidence": 0.96,
  "state": "OPEN",
  "source": "email",
  "source_id": "msg_047",
  "created_at": "2024-01-15T09:00:00Z"
}
```

## Confidence scores

| Range | Interpretation |
|-------|---------------|
| `0.85–1.00` | High confidence — clear commitment |
| `0.60–0.84` | Medium confidence — likely a commitment |
| `< 0.60` | Low confidence — ambiguous, may need human review |

Scores below `0.60` trigger a `PENDING_REVIEW` state by default. You can configure this threshold per workspace.

## Sources

Each commitment is associated with a `source` type and a `source_id` you provide. This lets you trace any commitment back to the original message in your system.

Supported source types: `email`, `slack`, `transcript`, `ticket`, `chat`, `document`

## Multiple commitments per text

A single text can contain multiple commitments. COGEXT returns all of them:

```json
{
  "commitments": [
    { "id": "cmt_001", "action": "send", "object": "the proposal", ... },
    { "id": "cmt_002", "action": "schedule", "object": "a follow-up call", ... }
  ],
  "count": 2
}
```
