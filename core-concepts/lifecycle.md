---
title: Lifecycle
description: The 12 states a commitment moves through from detection to resolution.
---

# Lifecycle

Every commitment starts at `detected` and moves through states based on elapsed time, shape, confidence, and evidence submitted. COGEXT manages all time-based transitions automatically.

## State diagram

```
detected → pending_review → open → due → overdue → fulfilled ✓
                          → cancelled ✗
                          → superseded ✗
                          → contradicted ✗
                          → blocked → open
                                    → failed ✗
                          → expired ✗
```

## States

| State | Meaning |
|-------|---------|
| `detected` | Just extracted from text — not yet validated |
| `pending_review` | Flagged for human review before activation |
| `open` | Active: deadline is in the future |
| `due` | Deadline has been reached, awaiting fulfillment signal |
| `overdue` | Past deadline with no fulfillment evidence |
| `fulfilled` | Evidence confirms the commitment was met |
| `failed` | Commitment was not met |
| `contradicted` | Prior fulfillment claim contradicted by new evidence |
| `cancelled` | Explicitly cancelled |
| `superseded` | Replaced by a newer commitment |
| `blocked` | Cannot proceed: external dependency unresolved |
| `expired` | Timed out with no resolution after the overdue window |

## Routing at creation

When a commitment is first extracted, it is routed to either `open` or `pending_review` based on **shape first, then confidence**:

| Shape | Condition | Initial status |
|-------|-----------|---------------|
| `external_side_effect` | Any confidence | `pending_review` |
| `logged_intent` | confidence ≥ 0.92 | `open` |
| `logged_intent` | confidence < 0.92 | `pending_review` |

External commitments (sending emails, deploying code, calling APIs, booking meetings) always require human review before becoming active — regardless of how confident the extraction was. This prevents agents from auto-confirming real-world actions.

## Evidence gate for fulfillment

External commitments (`shape: "external_side_effect"`) cannot be marked `fulfilled` without at least one evidence record with a confidence score ≥ 0.7.

Attempting the transition without sufficient evidence returns a `422` error:

```json
{
  "detail": "External commitment requires evidence score >= 0.7 before fulfillment (best score so far: 0.00). Add evidence first via POST /commitments/{id}/evidence."
}
```

The correct flow for an external commitment:

```
detected → pending_review → open → (submit evidence) → fulfilled
```

Internal commitments (`logged_intent`) have no evidence gate — they can be marked fulfilled directly.

## Transitions

### Time-based (automatic)
COGEXT advances these transitions on a schedule:

```
open    ──(deadline reached)──► due
due     ──(grace period ends)──► overdue
overdue ──(expiry window)──────► expired
```

### Evidence-based
Submitting evidence via the `/evidence` endpoint triggers:

```
open / due / overdue + fulfillment evidence   ──► fulfilled
open / due / overdue + contradiction evidence ──► failed
fulfilled + contradiction evidence            ──► contradicted
```

### Manual
Use the [Update State](/api-reference/update-state) endpoint to force any valid transition:

```bash
curl -X PATCH https://api.cogextai.com/api/v1/commitments/{id} \
  -H "Authorization: Bearer cg_live_YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{"status": "cancelled", "actor": "user"}'
```

Valid transitions:

| From | To |
|------|----|
| `detected` | `open`, `pending_review`, `cancelled` |
| `pending_review` | `open`, `cancelled` |
| `open` | `due`, `fulfilled`*, `failed`, `expired`, `cancelled`, `superseded`, `contradicted`, `blocked` |
| `due` | `overdue`, `fulfilled`*, `failed`, `cancelled`, `superseded`, `contradicted`, `blocked` |
| `overdue` | `fulfilled`*, `failed`, `expired`, `cancelled` |
| `blocked` | `open`, `failed`, `cancelled` |

*`fulfilled` requires evidence score ≥ 0.7 for `external_side_effect` commitments.

Terminal states (`fulfilled`, `failed`, `expired`, `cancelled`, `superseded`, `contradicted`) have no outbound transitions.

## Webhook events

Every state transition fires a webhook event:

| Event | Fired when |
|-------|-----------|
| `commitment.detected` | Commitment first extracted |
| `commitment.open` | Moved to open after review |
| `commitment.due` | Deadline reached |
| `commitment.overdue` | Past deadline, still open |
| `commitment.fulfilled` | Marked fulfilled |
| `commitment.failed` | Marked failed |
| `commitment.cancelled` | Cancelled |
| `commitment.contradicted` | Prior fulfillment contradicted |

See [Webhooks](/core-concepts/webhooks) for payload format and signature verification.
