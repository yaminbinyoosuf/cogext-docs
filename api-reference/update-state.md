---
title: Update State
description: Manually set a commitment to a specific state.
---

# Update State

<span class="method-post">POST</span> `https://api.cogextai.com/api/v1/commitments/{id}/state`

Manually force a commitment into a specific state. Use this when you have out-of-band information that isn't in text form — e.g., a human reviewer confirms or rejects a commitment.

## Request

```bash
curl -X POST https://api.cogextai.com/api/v1/commitments/cmt_abc123/state \
  -H "Authorization: Bearer cg_live_YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "state": "CANCELLED",
    "reason": "Project was deprioritised."
  }'
```

## Path parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | The commitment ID |

## Body parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `state` | string | **Yes** | Target state (see valid values below) |
| `reason` | string | No | Optional reason recorded in the audit trail |

## Valid target states

| State | When to use |
|-------|------------|
| `OPEN` | Re-activate a commitment in review or blocked state |
| `FULFILLED` | Mark as done without text evidence |
| `FAILED` | Mark as failed without text evidence |
| `CANCELLED` | The commitment was withdrawn |
| `BLOCKED` | Cannot proceed — waiting on a dependency |
| `SUPERSEDED` | Replaced by a new commitment |

## Response

```json
{
  "id": "cmt_abc123",
  "state": "CANCELLED",
  "reason": "Project was deprioritised.",
  "updated_at": "2024-01-20T10:00:00Z"
}
```

::: tip Fires webhook events
A manual state update fires the same webhook events as an automatic transition. Your downstream systems don't need to distinguish between manual and automatic changes.
:::
