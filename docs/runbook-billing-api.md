# Runbook: billing-api

Owner: Payments team. Stack: Node.js, PostgreSQL (payments-db).

## What it does

Handles subscription billing, invoice generation, and payment provider webhooks (card charges, refunds, disputes).

## Common incidents

**Webhook retries piling up** — usually means the payment provider changed their retry backoff or a downstream call (payments-db) is slow. Check the queue depth first; if it's draining slowly rather than growing, it will usually recover on its own within 15 minutes.

**Invoice duplication** — billing-api uses idempotency keys on invoice creation. If duplicates appear, check whether a client retried a request without reusing the same idempotency key — this is a client-side bug, not a billing-api bug, in most cases.

**Degraded status** — if billing-api shows degraded in the catalog, check payments-db connection pool usage first; that's the most common root cause, since billing-api holds connections open longer than other services during invoice generation.

## Escalation

Page the Payments team on-call for anything involving actual money movement (failed charges, incorrect invoice amounts). Everything else can wait for business hours.
