# Dev Platform Portal

A self-service internal developer platform, in miniature — the kind of tooling a Platform Engineering team builds for its own engineers. Built as a standalone portfolio project.

## The four pillars

1. **Service catalog** — a list of internal services (owner, stack, status, docs link).
2. **Environment provisioning** — a self-service form that simulates provisioning (never touches real infrastructure; the point is the UX of the flow, not an IaC engine).
3. **Pipeline status** — a mocked CI/CD view (success / failed / running runs).
4. **RAG assistant** — a chatbot over this project's own internal docs, using the same embeddings + pgvector pattern built for [Siegfried](https://github.com/joshrubio/Siegfried).

## Stack

Next.js (App Router) + TypeScript + Tailwind + shadcn/ui — same recipe as Siegfried, for consistency and speed.

## Status

Early scaffold. See the project card in Siegfried's dashboard for live status.
