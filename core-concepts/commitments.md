---
title: Commitments
description: "The core data model: what COGEXT extracts from text."
---

# Commitments

## What is a commitment?

A commitment is a promise, obligation, or task extracted from unstructured text. COGEXT parses the following fields from natural language:

| Field | Description | Example |
|-------|-------------|---------|
| `id` | Unique commitment ID | `cmt_abc123` |
| `action` | The verb: what will be done | `send`, `schedule`, `review` |
| `object` | What the action applies to | `the report`, `a meeting`, `your PR` |
| `recipient` | Who the commitment is made to | `you`, `the team`, `Sarah` |
| `deadline_expression` | Deadline as expressed in source text | `by Friday EOD` |
| `due_condition.deadline` | Deadline resolved to ISO 8601 UTC | `2024-01-19T17:00:00Z` |
| `confidence` | Extraction confidence score (0–1) | `0.97` |
| `status` | Current lifecycle state | `open`, `fulfilled` |
| `shape` | Whether the commitment causes a real-world effect | `external_side_effect` |
| `verifier_query` | How to independently confirm it happened | `check sent items for email to Sarah` |
| `verification_status` | Whether the commitment can be verified | `unverified`, `unverifiable` |
| `timezone` | Actor's local timezone at ingest time | `Asia/Kolkata` |
| `source_type` | Where the text came from | `agent_message`, `email` |
| `source_message_id` | Your identifier for the origin message | `msg_001` |

## Commitment shape

Every commitment is classified into one of two shapes at extraction time:

| Shape | Meaning | Examples |
|-------|---------|---------|
| `external_side_effect` | The action causes a real-world effect outside the agent that can be independently verified | Sends an email, books a meeting, deploys code, calls an API, makes a payment |
| `logged_intent` | An internal action with no independently verifiable external effect | Records a decision, notes an analysis, updates agent state, acknowledges something |

This distinction matters because **external commitments require higher scrutiny**. A logged intent is completed when the agent says so. An external side effect must be confirmed by evidence — the agent claiming it happened is not enough.

External commitments always route to `pending_review` first, regardless of confidence score. They cannot be marked `fulfilled` without evidence (see [Evidence Gate](#evidence-gate)).

## Verifier query

For each commitment, COGEXT generates a `verifier_query` — a plain-English description of how to independently confirm the commitment was fulfilled:

| Commitment type | Example verifier query |
|----------------|----------------------|
| Email sent | `check sent items for email to Sarah with subject containing 'Q3 report'` |
| Meeting booked | `check calendar for team sync on Friday afternoon` |
| Code deployed | `check CI/CD logs or git log for deployment to production` |
| File created | `check drive for file named 'contract-draft.pdf'` |

If the LLM cannot generate a verifier query — because the commitment is purely internal — the commitment is flagged `verification_status: "unverifiable"` at creation time. This happens upfront, not retroactively.

## Timezone-aware deadlines

COGEXT resolves deadline expressions in the **actor's local timezone**, not UTC. Pass the actor's timezone in the `timezone` field of the ingest request:

```json
{ "timezone": "Asia/Kolkata" }
```

"By Friday EOD" for an actor in `Asia/Kolkata` resolves to Friday 23:59 IST, which is stored as Friday 18:29 UTC — not Friday 23:59 UTC (which would be Saturday morning for them).

All resolved deadlines are stored in UTC. The actor's original timezone is stored alongside the commitment.

## Example extraction

Input text:
```
"I'll send the Q3 report to Sarah by Friday EOD."
```

Ingest request:
```json
{
  "message": "I'll send the Q3 report to Sarah by Friday EOD.",
  "source_agent_id": "00000000-0000-0000-0000-000000000001",
  "timezone": "Asia/Kolkata"
}
```

Extracted commitment:
```json
{
  "id": "1ebd3ba6-a849-4e5b-abfd-0edc5d6b7f50",
  "promise_text": "I will send the Q3 report to Sarah",
  "action": "send",
  "object": "Q3 report",
  "recipient": "Sarah",
  "deadline_expression": "by Friday EOD",
  "due_condition": {
    "type": "time",
    "deadline": "2026-09-11T18:29:59Z",
    "trigger_description": "by Friday EOD"
  },
  "confidence": 0.95,
  "status": "pending_review",
  "shape": "external_side_effect",
  "verifier_query": "check sent items for email to Sarah with subject containing 'Q3 report'",
  "verification_status": "unverified",
  "timezone": "Asia/Kolkata",
  "classification": "genuine_commitment"
}
```

## Confidence scores

| Range | Interpretation |
|-------|---------------|
| `0.92–1.00` | High confidence: routes to `open` (logged_intent only) |
| `0.50–0.91` | Medium confidence: routes to `pending_review` |
| `< 0.50` | Not extracted |

Note: `external_side_effect` commitments always route to `pending_review` regardless of confidence score.

## Evidence gate

External commitments (`shape: "external_side_effect"`) cannot be marked `fulfilled` without at least one evidence record with a score ≥ 0.7. Attempting the transition without sufficient evidence returns:

```json
{
  "detail": "External commitment requires evidence score >= 0.7 before fulfillment (best score so far: 0.00). Add evidence first via POST /commitments/{id}/evidence."
}
```

This prevents agents from self-reporting completion on real-world actions. See [Evidence](/core-concepts/evidence) for how to submit evidence.

## Multiple commitments per message

A single message can contain multiple commitments. COGEXT returns all of them:

```json
{
  "commitments": [
    { "id": "cmt_001", "action": "send", "object": "the proposal", "shape": "external_side_effect", ... },
    { "id": "cmt_002", "action": "note", "object": "the decision", "shape": "logged_intent", ... }
  ]
}
```
