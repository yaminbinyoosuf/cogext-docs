---
title: Python SDK
description: Install and use the COGEXT Python client.
---

# Python SDK

## Installation

```bash
pip install cogext
```

Requires Python 3.8+.

## Setup

```python
from cogext import Cogext

client = Cogext(api_key="cg_live_YOUR_KEY")

# Or use an environment variable:
# export COGEXT_API_KEY=cg_live_YOUR_KEY
client = Cogext()
```

## Track commitments

```python
result = client.commitments.track(
    text="I will send the proposal by Monday.",
    source="email",
    source_id="msg_001"
)

for commitment in result.commitments:
    print(commitment.id, commitment.state, commitment.deadline_normalized_utc)
# cmt_abc123 OPEN 2024-01-22T23:59:59Z
```

## Get a commitment

```python
commitment = client.commitments.get("cmt_abc123")
print(commitment.state)  # OPEN
```

## List commitments

```python
overdue = client.commitments.list(state="OVERDUE", limit=50)
for c in overdue.commitments:
    print(c.id, c.action, c.object)
```

## Add evidence

```python
updated = client.commitments.add_evidence(
    commitment_id="cmt_abc123",
    type="fulfillment",
    text="Proposal sent as attached.",
    source="email",
    source_id="msg_002"
)
print(updated.state)  # FULFILLED
```

## Update state

```python
client.commitments.update_state(
    commitment_id="cmt_abc123",
    state="CANCELLED",
    reason="Project cancelled."
)
```

## Async client

```python
import asyncio
from cogext import AsyncCogext

async def main():
    client = AsyncCogext(api_key="cg_live_YOUR_KEY")
    result = await client.commitments.track(
        text="I'll have this reviewed by Wednesday."
    )
    print(result.commitments[0].state)

asyncio.run(main())
```

## Error handling

```python
from cogext import CogextError, AuthenticationError, RateLimitError, NotFoundError

try:
    result = client.commitments.track(text="I'll follow up tomorrow.")
except AuthenticationError:
    print("Invalid or missing API key")
except RateLimitError as e:
    print(f"Rate limited: retry after {e.retry_after}s")
except NotFoundError:
    print("Commitment not found")
except CogextError as e:
    print(f"API error {e.status_code}: {e.message}")
```

## Configuration

```python
client = Cogext(
    api_key="cg_live_YOUR_KEY",
    base_url="https://api.cogextai.com/api/v1",  # default
    timeout=30,       # seconds
    max_retries=3,    # automatic retry on 5xx
)
```
