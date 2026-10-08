# Pipelines guide

The Pipelines tab shows CI/CD runs across every service in the catalog, grouped by status: Running, Failed, Success.

Each run shows the commit SHA, service, commit message, branch (on hover), duration, how long ago it ran, and who triggered it.

## What to do when a run fails

1. Open the run and check the failing step in the CI logs (link from the commit SHA).
2. Common causes: flaky integration tests, a dependency version mismatch, or a migration that didn't run cleanly in CI.
3. If the failure blocks `main`, revert the offending commit rather than debugging on top of a broken branch.
4. Re-run only after the root cause is understood — re-running a flaky failure without investigating hides real problems.

## Retention

Pipeline run history is kept for 90 days. Older runs are archived and available on request from the Platform team.
