---
title: Lifecycle
description: The 12 states a commitment moves through from detection to resolution.
---

# Lifecycle

Every commitment starts at `DETECTED` and moves through states based on elapsed time and evidence submitted. COGEXT manages all time-based transitions automatically.

## State diagram

```
                    ┌─────────────────────────────┐
                    ▼                             │
DETECTED → PENDING_REVIEW → OPEN → DUE → OVERDUE │
                              │        │          │
                              └────────┴──────────┤
                                                  ▼
                              FULFILLED / FAILED / CONTRADICTED
                              CANCELLED / SUPERSEDED / BLOCKED / EXPIRED
```

## States

| State | Meaning |
|-------|---------|
| `DETECTED` | Just extracted from text — not yet validated |
| `PENDING_REVIEW` | Flagged for human review before activation (low confidence or policy rule) |
| `OPEN` | Active — deadline is in the future |
| `DUE` | Deadline has been reached, awaiting fulfillment signal |
| `OVERDUE` | Past deadline with no fulfillment evidence |
| `FULFILLED` | Evidence confirms the commitment was met |
| `FAILED` | Commitment was not met — evidence of failure or explicit update |
| `CONTRADICTED` | Prior fulfillment claim contradicted by new evidence |
| `CANCELLED` | Explicitly cancelled by the commitment maker |
| `SUPERSEDED` | Replaced by a newer commitment (e.g. deadline moved) |
| `BLOCKED` | Cannot proceed — external dependency unresolved |
| `EXPIRED` | Timed out with no resolution after the overdue window |

## Transitions

### Time-based (automatic)
COGEXT advances these transitions on a schedule:

```
OPEN ──(deadline reached)──► DUE
DUE  ──(grace period ends)──► OVERDUE
OVERDUE ──(expiry window)──► EXPIRED
```

### Evidence-based
Submitting evidence via the `/evidence` endpoint triggers:

```
OPEN / DUE / OVERDUE + fulfillment evidence  ──► FULFILLED
OPEN / DUE / OVERDUE + contradiction evidence ──► FAILED
FULFILLED + contradiction evidence            ──► CONTRADICTED
```

### Manual
Use the [Update State](/api-reference/update-state) endpoint to force any valid transition:

```bash
# Cancel a commitment
POST /commitments/cmt_abc123/state
{ "state": "CANCELLED", "reason": "Project deprioritised." }
```

Valid manual targets: `OPEN`, `FULFILLED`, `FAILED`, `CANCELLED`, `BLOCKED`, `SUPERSEDED`

## Webhook events

Every state transition fires a webhook event:

| Event | Fired when |
|-------|-----------|
| `commitment.detected` | Commitment first extracted |
| `commitment.open` | Moved to OPEN after review |
| `commitment.due` | Deadline reached |
| `commitment.overdue` | Past deadline, still open |
| `commitment.fulfilled` | Marked fulfilled |
| `commitment.failed` | Marked failed |
| `commitment.cancelled` | Cancelled |
| `commitment.contradicted` | Prior fulfillment contradicted |

See [Webhooks](/core-concepts/webhooks) for payload format and signature verification.
