---
title: Evidence
description: Submit signals that confirm or deny commitment fulfillment.
---

# Evidence

## What is evidence?

Evidence is a signal you submit that indicates a commitment was or was not fulfilled. COGEXT uses evidence to automatically transition commitments toward `FULFILLED`, `FAILED`, or `CONTRADICTED`.

You typically submit evidence when you detect a follow-up message in the same thread — e.g., "Here's the report I promised" or "Sorry, we can't deliver this anymore."

## Evidence types

| Type | Effect on commitment state |
|------|--------------------------|
| `fulfillment` | Moves commitment to `FULFILLED` |
| `contradiction` | Moves to `FAILED` (if open) or `CONTRADICTED` (if already fulfilled) |
| `update` | Adds context without changing state |

## Submitting evidence

```bash
curl -X POST https://api.cogextai.com/api/v1/commitments/cmt_abc123/evidence \
  -H "Authorization: Bearer cg_live_YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "fulfillment",
    "text": "Attached the contract draft as promised.",
    "source": "email",
    "source_id": "msg_002"
  }'
```

## Response

```json
{
  "id": "cmt_abc123",
  "state": "FULFILLED",
  "evidence": [
    {
      "id": "ev_xyz789",
      "type": "fulfillment",
      "text": "Attached the contract draft as promised.",
      "source": "email",
      "source_id": "msg_002",
      "created_at": "2024-01-18T17:30:00Z"
    }
  ]
}
```

## Evidence scoring

COGEXT scores evidence relevance against the original commitment using four weighted dimensions:

| Dimension | Weight | What it checks |
|-----------|--------|---------------|
| `action` | 40% | Does the evidence describe the committed action? |
| `recipient` | 30% | Is it directed to the same recipient? |
| `object` | 20% | Does it reference the same object? |
| `deadline` | 10% | Is it within the commitment's time window? |

A total score above `0.75` automatically triggers a state transition. Below that threshold, the evidence is recorded but the state change requires manual review.

## State transition rules

```
OPEN / DUE / OVERDUE + fulfillment  ──► FULFILLED
OPEN / DUE / OVERDUE + contradiction ──► FAILED
FULFILLED + contradiction            ──► CONTRADICTED
Any state + update                   ──► state unchanged
```

::: tip Processing threads automatically
If you're processing email threads or Slack channel history, pipe every message in the thread through both `/track` (to catch new commitments) and `/evidence` (to resolve existing ones). COGEXT deduplicates by `source_id`.
:::
