# Janus overview

Janus is the internal self-service developer platform. It has four parts:

1. **Catalog** — the list of internal services, with owner, stack, status, docs, and repo links.
2. **Provisioning** — request a new environment (development, staging, or preview) for any service in the catalog. Environments are torn down automatically after 7 days of inactivity.
3. **Pipelines** — live status of CI/CD runs across all services, grouped by running, failed, and success.
4. **Assistant** — this chat, which answers questions using the docs in this folder.

Janus does not manage production infrastructure directly. It is a thin, friendly layer over the tools teams already use (CI, cloud accounts, DNS). Think of it as the front door, not the building.
