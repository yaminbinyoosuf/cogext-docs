---
title: Add Evidence
description: Submit a fulfillment or contradiction signal for a commitment.
---

# Add Evidence

<span class="method-post">POST</span> `https://api.cogextai.com/api/v1/commitments/{id}/evidence`

Submit evidence that confirms, contradicts, or adds context to a commitment. COGEXT evaluates the evidence and automatically transitions the commitment state if the score threshold is met.

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
| `source_id` | string | No | Your source message ID |

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
      "source": "email",
      "source_id": "msg_002",
      "created_at": "2024-01-19T16:30:00Z"
    }
  ],
  "updated_at": "2024-01-19T16:30:00Z"
}
```

## State transitions

| Current state | Evidence type | New state |
|---------------|--------------|-----------|
| `OPEN` / `DUE` / `OVERDUE` | `fulfillment` | `FULFILLED` |
| `OPEN` / `DUE` / `OVERDUE` | `contradiction` | `FAILED` |
| `FULFILLED` | `contradiction` | `CONTRADICTED` |
| Any | `update` | unchanged |
