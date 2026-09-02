---
title: Get Commitment
description: Retrieve a single commitment by ID.
---

# Get Commitment

<span class="method-get">GET</span> `https://api.cogextai.com/api/v1/commitments/{id}`

Returns a single commitment with full details including all evidence submitted.

## Request

```bash
curl https://api.cogextai.com/api/v1/commitments/cmt_abc123 \
  -H "Authorization: Bearer cg_live_YOUR_KEY"
```

## Path parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | The commitment ID (e.g. `cmt_abc123`) |

## Response

```json
{
  "id": "cmt_abc123",
  "action": "send",
  "object": "the report",
  "recipient": null,
  "deadline_raw": "by Friday EOD",
  "deadline_normalized_utc": "2024-01-19T23:59:59Z",
  "confidence": 0.97,
  "state": "OPEN",
  "source": "email",
  "source_id": "msg_001",
  "metadata": {},
  "evidence": [],
  "created_at": "2024-01-15T09:00:00Z",
  "updated_at": "2024-01-15T09:00:00Z"
}
```

## Error codes

| Code | Meaning |
|------|---------|
| `404` | Commitment not found |
| `401` | Invalid or missing API key |
