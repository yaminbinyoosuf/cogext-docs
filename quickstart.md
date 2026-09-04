---
title: Quickstart
description: Track your first commitment in under 5 minutes.
---

# Quickstart

## 1. Get your API key

Sign up at [cogextai.com](https://cogextai.com) — your API key starts with `cg_live_` and is shown immediately after signup.

## 2. Send your first commitment

```bash
curl -X POST https://api.cogextai.com/api/v1/ingest \
  -H "Authorization: Bearer cg_live_YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "I will send the Q3 report to Sarah by Friday EOD.",
    "source_agent_id": "00000000-0000-0000-0000-000000000001",
    "timezone": "America/New_York"
  }'
```

Pass `timezone` as the actor's local timezone (e.g. `America/New_York`, `Asia/Kolkata`, `Europe/London`). Deadlines are resolved in that timezone and stored as UTC. Defaults to `UTC` if omitted.

## 3. Read the response

```json
{
  "commitments": [
    {
      "id": "1ebd3ba6-a849-4e5b-abfd-0edc5d6b7f50",
      "promise_text": "I will send the Q3 report to Sarah",
      "action": "send",
      "object": "Q3 report",
      "recipient": "Sarah",
      "deadline_expression": "by Friday EOD",
      "due_condition": {
        "type": "time",
        "deadline": "2026-09-12T03:59:59Z"
      },
      "confidence": 0.95,
      "status": "pending_review",
      "shape": "external_side_effect",
      "verifier_query": "check sent items for email to Sarah with subject containing 'Q3 report'",
      "verification_status": "unverified",
      "timezone": "America/New_York",
      "classification": "genuine_commitment"
    }
  ]
}
```

A few things to notice:

- **`shape: "external_side_effect"`** — sending an email is a real-world action, so COGEXT classified it as external.
- **`status: "pending_review"`** — external commitments always go here first, waiting for human review before becoming active.
- **`verifier_query`** — COGEXT generated how to independently confirm this happened.
- **`due_condition.deadline`** — "Friday EOD" resolved in `America/New_York` (Friday 23:59 ET = Saturday 03:59 UTC).

## 4. Move it to open (after review)

```bash
curl -X PATCH https://api.cogextai.com/api/v1/commitments/1ebd3ba6-a849-4e5b-abfd-0edc5d6b7f50 \
  -H "Authorization: Bearer cg_live_YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{"status": "open", "actor": "reviewer"}'
```

## 5. Submit evidence when it's done

For external commitments, you must submit evidence before marking fulfilled:

```bash
curl -X POST https://api.cogextai.com/api/v1/commitments/1ebd3ba6-a849-4e5b-abfd-0edc5d6b7f50/evidence \
  -H "Authorization: Bearer cg_live_YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "source_system": "gmail",
    "event_type": "email_sent",
    "payload": {
      "to": "sarah@example.com",
      "subject": "Q3 Report",
      "sent_at": "2026-09-11T14:30:00Z"
    }
  }'
```

Once the evidence score reaches ≥ 0.7, you can mark it fulfilled:

```bash
curl -X PATCH https://api.cogextai.com/api/v1/commitments/1ebd3ba6-a849-4e5b-abfd-0edc5d6b7f50 \
  -H "Authorization: Bearer cg_live_YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{"status": "fulfilled", "actor": "system"}'
```

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
You've tracked, reviewed, evidenced, and resolved your first commitment. Next: understand [commitment shapes](/core-concepts/commitments#commitment-shape) or explore the full [lifecycle](/core-concepts/lifecycle).
:::
