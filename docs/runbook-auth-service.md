# Runbook: auth-service

Owner: Platform team. Stack: Go, Redis.

## What it does

Central authentication and session management for every internal app, including Janus itself. Issues and validates session tokens, handles login/logout, and rotates signing keys on a schedule.

## Common incidents

**Mass logout** — happens when signing keys are rotated without a grace period. auth-service is supposed to accept both the old and new key for 1 hour after rotation; if that window was skipped, every active session becomes invalid at once. Check the most recent key rotation run first.

**Elevated login latency** — almost always a Redis issue, since every session check is a Redis read. Check Redis memory usage and eviction rate before looking at auth-service itself.

**Dependent services failing auth checks** — if multiple unrelated services start rejecting valid sessions at the same time, the shared cause is almost certainly auth-service, not the individual services. Check auth-service's own health and recent deploys before debugging each dependent service separately.

## Escalation

auth-service is a hard dependency for every other service in the catalog. Any incident here should be treated as high severity by default, even if the symptoms look minor at first.
