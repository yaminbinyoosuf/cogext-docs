---
title: Add Evidence
description: Submit a fulfillment or contradiction signal for a commitment.
---

# Add Evidence

<span class="method-post">POST</span> `https://api.cogextai.com/api/v1/commitments/{id}/evidence`

Submit evidence that confirms, contradicts, or adds context to a commitment. COGEXT scores the evidence for relevance and automatically transitions the commitment state when the score threshold is met.

## Request

```bash
curl -X POST https://api.cogextai.com/api/v1/commitments/cmt_abc123/evidence \
  -H "Authorization: Bearer cg_live_YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "fulfillment",
    "text": "Report sent as attached.",
    "source": "email",
    "source_id": "msg_002"
  }'
```

## Path parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | The commitment ID |

## Body parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `type` | string | **Yes** | `fulfillment`, `contradiction`, or `update` |
| `text` | string | **Yes** | The evidence text |
| `source` | string | No | Source type |
| `source_id` | string | No | Your source message ID for idempotency |

## Response

```json
{
  "id": "cmt_abc123",
  "state": "FULFILLED",
  "evidence": [
    {
      "id": "ev_xyz789",
      "type": "fulfillment",
      "text": "Report sent as attached.",
      "score": 0.91,
      "strength": "strong",
      "source": "email",
      "source_id": "msg_002",
      "created_at": "2024-01-19T16:30:00Z"
    }
  ],
  "updated_at": "2024-01-19T16:30:00Z"
}
```

## Evidence strength

The `strength` field maps the relevance score to a label:

| Score range | Strength |
|-------------|----------|
| 0.80 and above | `strong` |
| 0.50 to 0.79 | `supporting` |
| Below 0.50 | `weak` |

All evidence is stored regardless of strength. Auto-transition to `FULFILLED` requires a score of 0.70 or above (i.e. `supporting` or `strong`).

## State transitions

| Current state | Evidence type | Score | New state |
|---------------|--------------|-------|-----------|
| `OPEN` / `DUE` / `OVERDUE` | `fulfillment` | >= 0.70 | `FULFILLED` |
| `OPEN` / `DUE` / `OVERDUE` | `fulfillment` | < 0.70 | unchanged |
| `OPEN` / `DUE` / `OVERDUE` | `contradiction` | any | `FAILED` |
| `FULFILLED` | `contradiction` | any | `CONTRADICTED` |
| Any | `update` | any | unchanged |

## Notes

- `external_side_effect` commitments require a fulfillment score >= 0.70 before transitioning. Agents cannot self-report completion.
- `logged_intent` commitments can be closed by the agent without external evidence.
- Duplicate `source_id` submissions are idempotent.
