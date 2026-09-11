---
title: Audit Receipts
description: HMAC-signed tamper-evident records for any commitment.
---

# Audit Receipts

Every commitment in COGEXT can produce a public audit receipt — an HMAC-SHA256 token that proves a commitment existed, what it said, and what state it was in at a specific point in time. The receipt is verifiable by anyone without an API key.

## How it works

When you request a receipt for a commitment, COGEXT signs a snapshot of the commitment's fields with a secret key. The signature is embedded in the receipt URL. Anyone who opens the URL can verify the record is authentic and untampered.

## Get a receipt URL

```bash
curl -X GET https://api.cogextai.com/api/v1/commitments/cmt_abc123/receipt \
  -H "Authorization: Bearer cg_live_YOUR_KEY"
```

### Response

```json
{
  "receipt_url": "https://cogextai.com/receipt?token=eyJpZCI6ImNtdF9hYmMxMjMiLCJzaWduYXR1cmUiOiJhYmMxMjMifQ",
  "commitment_id": "cmt_abc123",
  "issued_at": "2024-01-19T16:30:00Z"
}
```

## Verify a receipt

Open the `receipt_url` in any browser. The page fetches the commitment snapshot from the API, recomputes the HMAC, and shows:

- Promise text
- Current state (`FULFILLED`, `OPEN`, `FAILED`, etc.)
- Confidence score
- Deadline
- Tamper-evident badge — green if the signature matches, red if the record has been altered

No login required to verify.

## What the token contains

The token is a base64-encoded JSON payload with the commitment ID and an HMAC-SHA256 signature over the commitment's immutable fields. It cannot be forged without the signing key and cannot be altered without invalidating the signature.

## Use cases

- Share proof that an AI agent made a specific commitment before a deadline
- Attach to a support ticket to prove a promise was logged
- Audit trail for regulated workflows where commitments must be independently verifiable
