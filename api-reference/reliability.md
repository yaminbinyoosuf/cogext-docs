---
title: Reliability Metrics
description: Get fulfillment rate and reliability data for your agents.
---

# Reliability Metrics

<span class="method-get">GET</span> `https://api.cogextai.com/api/v1/reliability`

Returns fulfillment rate, overdue rate, and commitment counts for the authenticated account. Optionally filter by agent.

## Request

```bash
curl -X GET "https://api.cogextai.com/api/v1/reliability" \
  -H "Authorization: Bearer cg_live_YOUR_KEY"
```

Filter by a specific agent:

```bash
curl -X GET "https://api.cogextai.com/api/v1/reliability?source_agent_id=agent_abc123" \
  -H "Authorization: Bearer cg_live_YOUR_KEY"
```

Filter by time window:

```bash
curl -X GET "https://api.cogextai.com/api/v1/reliability?since=2024-01-01T00:00:00Z" \
  -H "Authorization: Bearer cg_live_YOUR_KEY"
```

## Query parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `source_agent_id` | string (UUID) | No | Filter to a specific agent |
| `since` | string (ISO 8601) | No | Only count commitments created after this timestamp |

## Response

```json
{
  "total": 142,
  "fulfilled": 118,
  "failed": 9,
  "overdue": 7,
  "open": 8,
  "fulfillment_rate": 0.83,
  "overdue_rate": 0.05,
  "by_shape": {
    "external_side_effect": {
      "total": 61,
      "fulfilled": 48,
      "fulfillment_rate": 0.79
    },
    "logged_intent": {
      "total": 81,
      "fulfilled": 70,
      "fulfillment_rate": 0.86
    }
  }
}
```

## Response fields

| Field | Type | Description |
|-------|------|-------------|
| `total` | integer | Total commitments in scope |
| `fulfilled` | integer | Commitments that reached `FULFILLED` |
| `failed` | integer | Commitments that reached `FAILED` or `CONTRADICTED` |
| `overdue` | integer | Currently in `OVERDUE` state |
| `open` | integer | Currently in `OPEN` or `DUE` state |
| `fulfillment_rate` | float | `fulfilled / (fulfilled + failed)`, 0.0 to 1.0 |
| `overdue_rate` | float | `overdue / total`, 0.0 to 1.0 |
| `by_shape` | object | Breakdown by `external_side_effect` and `logged_intent` |

## Notes

- `user_id` is always scoped to the authenticated API key. You cannot query another account's data by passing a user ID.
- `source_agent_id` must be a valid UUID. It is the same ID passed in the `source_agent_id` field during `/track` or `/ingest` calls.
- Commitments in `CANCELLED` or `PENDING_REVIEW` are excluded from the rate calculations.
