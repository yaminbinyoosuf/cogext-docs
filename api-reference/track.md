---
title: Track Commitments
description: Extract commitments from unstructured text.
---

# Track Commitments

<span class="method-post">POST</span> `https://api.cogextai.com/api/v1/commitments/track`

Extracts all commitments from the provided text. Returns structured commitment objects with normalized deadlines, confidence scores, and initial states.

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
      "state": "OPEN",
      "source": "email",
      "source_id": "msg_001",
      "metadata": {},
      "created_at": "2024-01-15T09:00:00Z"
    }
  ],
  "count": 1
}
```

## Notes

- A single text may return multiple commitments if multiple promises are detected.
- Commitments with `confidence < 0.60` start in `PENDING_REVIEW` rather than `OPEN`.
- Duplicate `source_id` submissions are idempotent — the same commitment is returned without re-extracting.
