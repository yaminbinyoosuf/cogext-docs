---
title: Quickstart
description: Track your first commitment in under 5 minutes.
---

# Quickstart

## 1. Get your API key

Sign in at [cogextai.com](https://cogextai.com) and copy your API key from Settings > API Keys > Create new key. It starts with `cg_live_`.

## 2. Send your first commitment

```bash
curl -X POST https://api.cogextai.com/api/v1/commitments/track \
  -H "Authorization: Bearer cg_live_YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "I will send you the report by Friday.",
    "source": "email",
    "source_id": "msg_001"
  }'
```

## 3. Read the response

```json
{
  "commitments": [
    {
      "id": "cmt_abc123",
      "action": "send",
      "object": "the report",
      "recipient": "you",
      "deadline_raw": "by Friday",
      "deadline_normalized_utc": "2024-01-19T23:59:59Z",
      "confidence": 0.97,
      "state": "OPEN"
    }
  ],
  "count": 1
}
```

COGEXT found one commitment, resolved the deadline to UTC, and set the state to `OPEN`.

## 4. Check its state

```bash
curl https://api.cogextai.com/api/v1/commitments/cmt_abc123 \
  -H "Authorization: Bearer cg_live_YOUR_KEY"
```

## 5. Submit evidence when it's done

```bash
curl -X POST https://api.cogextai.com/api/v1/commitments/cmt_abc123/evidence \
  -H "Authorization: Bearer cg_live_YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "fulfillment",
    "text": "Report attached as promised.",
    "source": "email",
    "source_id": "msg_002"
  }'
```

The commitment moves to `FULFILLED` automatically.

## 6. Set up a webhook (optional)

Receive real-time events when states change:

```bash
curl -X POST https://api.cogextai.com/api/v1/webhooks \
  -H "Authorization: Bearer cg_live_YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://yourapp.com/webhooks/cogext",
    "events": ["commitment.overdue", "commitment.fulfilled"]
  }'
```

::: tip You're ready
You've tracked, retrieved, and resolved your first commitment. Next: understand the [commitment lifecycle](/core-concepts/lifecycle) or explore the full [API reference](/api-reference/track).
:::
