# COGEXT Docs

Source for **[docs.cogextai.com](https://docs.cogextai.com)**: the documentation for the COGEXT API.

COGEXT is the accountability layer for AI agents. An LLM interprets what the agent promised,
code decides whether the evidence proves it, and Postgres records every transition.

## What's inside

| Section | Covers |
| --- | --- |
| [Introduction](introduction.md) · [Quickstart](quickstart.md) · [Authentication](authentication.md) | Getting a key and tracking your first commitment |
| [Core concepts](core-concepts/) | Commitments, evidence, lifecycle, webhooks, audit receipts |
| [API reference](api-reference/) | `track`, `add-evidence`, `get-commitment`, `list-commitments`, `update-state`, `reliability` |

## Run locally

```bash
npm install
npm run docs:dev      # http://localhost:5173
npm run docs:build    # static output in .vitepress/dist
```

Built with [VitePress](https://vitepress.dev).

## Links

[cogextai.com](https://cogextai.com) · [Commitment Standard](https://cogextai.com/standard) · Python SDK: `pip install cogext`
