---
title: Track Commitments
description: Extract commitments from unstructured text.
---

# Track Commitments

<span class="method-post">POST</span> `https://api.cogextai.com/api/v1/commitments/track`

Extracts all commitments from the provided text. Returns structured commitment objects with normalized deadlines, confidence scores, shapes, risk scores, and verifier queries.

## Request

```bash
curl -X POST https://api.cogextai.com/api/v1/commitments/track \
  -H "Authorization: Bearer cg_live_YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "I will send the report by Friday EOD.",
    "source": "email",
    "source_id": "msg_001",
    "metadata": {}
  }'
```

## Body parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `text` | string | **Yes** | The text to extract commitments from |
| `source` | string | No | Source type: `email`, `slack`, `transcript`, `ticket`, `chat` |
| `source_id` | string | No | Your identifier for the origin message |
| `metadata` | object | No | Arbitrary key-value pairs attached to all extracted commitments |

## Response

```json
{
  "commitments": [
    {
      "id": "cmt_abc123",
      "action": "send",
      "object": "the report",
      "recipient": null,
      "deadline_raw": "by Friday EOD",
      "deadline_normalized_utc": "2024-01-19T23:59:59Z",
      "confidence": 0.97,
      "shape": "external_side_effect",
      "risk_score": 0.42,
      "verifier_query": "Was the report sent on or before Friday EOD? Check sent emails or delivery confirmation.",
      "state": "PENDING_REVIEW",
      "source": "email",
      "source_id": "msg_001",
      "metadata": {},
      "created_at": "2024-01-15T09:00:00Z"
    }
  ],
  "count": 1
}
```

## Response fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique commitment ID |
| `action` | string | The verb extracted — what must happen |
| `object` | string | What the action is applied to |
| `recipient` | string or null | Who receives the outcome, if specified |
| `deadline_raw` | string | Deadline as stated in the text |
| `deadline_normalized_utc` | string | Deadline resolved to UTC ISO 8601 |
| `confidence` | float | Extraction confidence, 0.0 to 1.0 |
| `shape` | string | `external_side_effect` or `logged_intent` — see below |
| `risk_score` | float | Risk heuristic across 5 factors, 0.0 to 1.0 |
| `verifier_query` | string | Plain-English instruction for independent verification |
| `state` | string | Initial lifecycle state |
| `source` | string | Source type passed in the request |
| `source_id` | string | Your origin message identifier |
| `metadata` | object | Key-value pairs from the request |
| `created_at` | string | UTC timestamp |

## Shape

Every commitment is classified at extraction:

- **`external_side_effect`** — the action touches the real world: an email sent, code deployed, an API called. Always starts in `PENDING_REVIEW`. Requires independent evidence before the state moves to `FULFILLED`.
- **`logged_intent`** — the action is internal: a decision recorded, a note made, agent state updated. Starts in `OPEN`. The agent's self-report is sufficient to complete it.

## Risk score

`risk_score` is computed at ingest across 5 factors: deadline proximity, commitment specificity, domain keywords (legal, contract, payment, compliance), past reliability of the actor, and contradiction signals. Scores at or above 0.70 fire a `risk.high` webhook event.

## Notes

- A single text may return multiple commitments if multiple promises are detected.
- Commitments with `confidence < 0.60` start in `PENDING_REVIEW` rather than `OPEN`.
- `external_side_effect` commitments always start in `PENDING_REVIEW` regardless of confidence.
- Duplicate `source_id` submissions are idempotent: the same commitment is returned without re-extracting.
- Deadlines are resolved against the actor's timezone when detectable; falls back to UTC.
