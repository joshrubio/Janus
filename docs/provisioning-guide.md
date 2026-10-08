# Provisioning guide

To provision an environment, go to the Provisioning tab, pick a service and an environment type, and click Provision.

## Environment types

- **Development** — short-lived, for local iteration. Shares the staging database.
- **Staging** — mirrors production configuration, used for pre-release QA. Has its own isolated database.
- **Preview** — created automatically per pull request in some services; can also be requested manually for demos.

## What happens during provisioning

1. The platform allocates the environment and pulls the latest image for the chosen service.
2. Network and DNS are configured so the environment gets a unique URL.
3. Environment variables and secrets are applied from the service's default profile.
4. The container starts and a health check confirms it's responding before the environment is marked ready.

## Limits

Each engineer can have up to 3 active development environments and 1 staging environment per service at a time. Preview environments don't count against this limit.
