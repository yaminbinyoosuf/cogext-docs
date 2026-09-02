---
title: Authentication
description: All API requests require a Bearer token.
---

# Authentication

## API Keys

All requests to the COGEXT API must include your API key as a Bearer token in the `Authorization` header.

```bash
Authorization: Bearer cg_live_YOUR_KEY
```

Keys starting with `cg_live_` are production keys. Keep them secret — never commit them to source control or expose them client-side.

## Getting a key

Sign in at [app.cogextai.com](https://app.cogextai.com) → **Settings → API Keys → Create new key**.

## Example request

```bash
curl https://api.cogextai.com/api/v1/commitments \
  -H "Authorization: Bearer cg_live_abc123xyz"
```

## Error codes

| Code | Meaning |
|------|---------|
| `401` | Missing or invalid API key |
| `403` | Valid key but insufficient permissions |
| `429` | Rate limit exceeded — back off and retry |

## Rate limits

Production keys are rate-limited per minute. The response headers include:

| Header | Description |
|--------|-------------|
| `X-RateLimit-Limit` | Requests allowed per minute |
| `X-RateLimit-Remaining` | Requests remaining this window |
| `X-RateLimit-Reset` | Unix timestamp when the window resets |

::: warning Keep keys secret
Never expose your API key in client-side code, public repositories, logs, or error messages. Rotate a compromised key immediately from the dashboard.
:::
