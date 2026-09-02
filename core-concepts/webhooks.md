---
title: Webhooks
description: Receive real-time events when commitment states change.
---

# Webhooks

## Overview

COGEXT sends signed HTTP POST requests to your endpoint when commitment events occur. Events are delivered within seconds of a state change.

## Registering a webhook

```bash
curl -X POST https://api.cogextai.com/api/v1/webhooks \
  -H "Authorization: Bearer cg_live_YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://yourapp.com/webhooks/cogext",
    "events": ["commitment.overdue", "commitment.fulfilled", "commitment.failed"]
  }'
```

Use `"events": ["*"]` to subscribe to all event types.

## Event types

| Event | Fired when |
|-------|-----------|
| `commitment.detected` | New commitment extracted from text |
| `commitment.open` | Commitment activated (moved out of review) |
| `commitment.due` | Deadline reached |
| `commitment.overdue` | Past deadline, still unfulfilled |
| `commitment.fulfilled` | Evidence confirms fulfillment |
| `commitment.failed` | Commitment marked as failed |
| `commitment.cancelled` | Commitment cancelled |
| `commitment.contradicted` | Prior fulfillment claim contradicted |
| `evidence.received` | New evidence submitted |
| `review.required` | Commitment flagged for human review |

## Event payload

```json
{
  "event": "commitment.overdue",
  "timestamp": "2024-01-20T10:00:00Z",
  "commitment": {
    "id": "cmt_abc123",
    "action": "send",
    "object": "the report",
    "recipient": "you",
    "state": "OVERDUE",
    "deadline_normalized_utc": "2024-01-19T23:59:59Z",
    "source": "email",
    "source_id": "msg_001"
  }
}
```

## Verifying signatures

Every webhook includes an `X-Cogext-Signature` header: an HMAC-SHA256 signature of the raw request body using your webhook secret. **Always verify this before processing.**

```python
import hmac
import hashlib

def verify_webhook(secret: str, payload: bytes, signature: str) -> bool:
    expected = hmac.new(
        secret.encode('utf-8'),
        payload,
        hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(expected, signature)
```

```typescript
import { createHmac, timingSafeEqual } from 'crypto'

function verifyWebhook(secret: string, payload: Buffer, signature: string): boolean {
  const expected = createHmac('sha256', secret)
    .update(payload)
    .digest('hex')
  return timingSafeEqual(Buffer.from(expected), Buffer.from(signature))
}
```

::: warning Verify every request
Do not process webhook payloads without verifying the signature. An attacker could otherwise send fake state-change events to your endpoint.
:::

## Retries

COGEXT retries failed deliveries (non-2xx responses or timeouts) with exponential backoff:

| Attempt | Delay |
|---------|-------|
| 1st retry | 30 seconds |
| 2nd retry | 2 minutes |
| 3rd retry | 10 minutes |
| 4th retry | 1 hour |
| 5th retry | 6 hours |

After 5 failed attempts, the event is dropped. Return a `200` status immediately upon receipt: process the event asynchronously if needed.

## Idempotency

Each event carries a unique `event_id`. Use it to deduplicate in case of retries:

```json
{
  "event_id": "evt_9f3k2m",
  "event": "commitment.fulfilled",
  ...
}
```
