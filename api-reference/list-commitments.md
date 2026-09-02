---
title: List Commitments
description: Query and filter all commitments in your workspace.
---

# List Commitments

<span class="method-get">GET</span> `https://api.cogextai.com/api/v1/commitments`

Returns a paginated list of commitments. Supports filtering by state, source, and more.

## Request

```bash
curl "https://api.cogextai.com/api/v1/commitments?state=OVERDUE&limit=20" \
  -H "Authorization: Bearer cg_live_YOUR_KEY"
```

## Query parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `state` | string | Filter by state: `OPEN`, `OVERDUE`, `FULFILLED`, `FAILED`, etc. |
| `source` | string | Filter by source type: `email`, `slack`, `transcript`, etc. |
| `source_id` | string | Filter by your source message ID |
| `recipient` | string | Filter by recipient name |
| `confidence_min` | float | Minimum confidence score (0–1) |
| `deadline_before` | ISO 8601 | Filter commitments due before this date |
| `deadline_after` | ISO 8601 | Filter commitments due after this date |
| `limit` | integer | Results per page — default `20`, max `100` |
| `offset` | integer | Pagination offset |

## Response

```json
{
  "commitments": [
    {
      "id": "cmt_abc123",
      "action": "send",
      "object": "the report",
      "recipient": null,
      "state": "OVERDUE",
      "deadline_normalized_utc": "2024-01-19T23:59:59Z",
      "confidence": 0.97,
      "source": "email",
      "created_at": "2024-01-15T09:00:00Z"
    }
  ],
  "total": 1,
  "limit": 20,
  "offset": 0
}
```
