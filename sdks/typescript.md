---
title: TypeScript SDK
description: Install and use the COGEXT TypeScript/JavaScript client.
---

# TypeScript SDK

## Installation

```bash
npm install @cogext/sdk
# or
yarn add @cogext/sdk
# or
pnpm add @cogext/sdk
```

Requires Node.js 18+ or a modern browser environment.

## Setup

```typescript
import { Cogext } from "@cogext/sdk";

const client = new Cogext({ apiKey: "cg_live_YOUR_KEY" });

// Or use an environment variable:
// COGEXT_API_KEY=cg_live_YOUR_KEY
const client = new Cogext();
```

## Track commitments

```typescript
const result = await client.commitments.track({
  text: "I will send the proposal by Monday.",
  source: "email",
  sourceId: "msg_001",
});

for (const commitment of result.commitments) {
  console.log(commitment.id, commitment.state, commitment.deadlineNormalizedUtc);
}
// cmt_abc123 OPEN 2024-01-22T23:59:59Z
```

## Get a commitment

```typescript
const commitment = await client.commitments.get("cmt_abc123");
console.log(commitment.state); // OPEN
```

## List commitments

```typescript
const overdue = await client.commitments.list({
  state: "OVERDUE",
  limit: 50,
});

for (const c of overdue.commitments) {
  console.log(c.id, c.action, c.object);
}
```

## Add evidence

```typescript
const updated = await client.commitments.addEvidence("cmt_abc123", {
  type: "fulfillment",
  text: "Proposal sent as attached.",
  source: "email",
  sourceId: "msg_002",
});

console.log(updated.state); // FULFILLED
```

## Update state

```typescript
await client.commitments.updateState("cmt_abc123", {
  state: "CANCELLED",
  reason: "Project cancelled.",
});
```

## TypeScript types

```typescript
import type {
  Commitment,
  CommitmentState,
  CommitmentList,
  TrackResult,
  Evidence,
  EvidenceType,
} from "@cogext/sdk";

// CommitmentState union
type CommitmentState =
  | "DETECTED"
  | "PENDING_REVIEW"
  | "OPEN"
  | "DUE"
  | "OVERDUE"
  | "FULFILLED"
  | "FAILED"
  | "CONTRADICTED"
  | "CANCELLED"
  | "SUPERSEDED"
  | "BLOCKED"
  | "EXPIRED";
```

## Webhook verification helper

```typescript
import { verifyWebhookSignature } from "@cogext/sdk";

// In your Express/Next.js/Hono handler:
app.post("/webhooks/cogext", express.raw({ type: "application/json" }), (req, res) => {
  const isValid = verifyWebhookSignature(
    process.env.COGEXT_WEBHOOK_SECRET!,
    req.body,
    req.headers["x-cogext-signature"] as string
  );

  if (!isValid) {
    return res.status(401).send("Invalid signature");
  }

  const event = JSON.parse(req.body.toString());
  console.log(event.event, event.commitment.id);

  res.sendStatus(200);
});
```

## Error handling

```typescript
import { CogextError, AuthenticationError, RateLimitError, NotFoundError } from "@cogext/sdk";

try {
  const result = await client.commitments.track({ text: "I'll follow up tomorrow." });
} catch (err) {
  if (err instanceof AuthenticationError) {
    console.error("Invalid API key");
  } else if (err instanceof RateLimitError) {
    console.error(`Rate limited: retry after ${err.retryAfter}s`);
  } else if (err instanceof NotFoundError) {
    console.error("Not found");
  } else if (err instanceof CogextError) {
    console.error(`API error ${err.statusCode}: ${err.message}`);
  }
}
```

## Configuration

```typescript
const client = new Cogext({
  apiKey: "cg_live_YOUR_KEY",
  baseUrl: "https://api.cogextai.com/api/v1", // default
  timeout: 30_000,  // ms
  maxRetries: 3,    // automatic retry on 5xx
  fetch: customFetch, // override fetch implementation
});
```
