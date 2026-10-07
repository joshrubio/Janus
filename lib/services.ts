export type ServiceStatus = "healthy" | "degraded" | "down" | "deprecated";
export type ServiceType = "api" | "frontend" | "worker" | "database" | "job";

export type Service = {
  slug: string;
  name: string;
  description: string;
  owner: string;
  type: ServiceType;
  stack: string[];
  status: ServiceStatus;
  docsPath: string;
  repoPath: string;
};

export const SERVICES: Service[] = [
  {
    slug: "billing-api",
    name: "billing-api",
    description: "Handles subscription billing, invoicing, and payment webhooks.",
    owner: "Payments team",
    type: "api",
    stack: ["Node.js", "PostgreSQL"],
    status: "healthy",
    docsPath: "docs.internal/billing-api",
    repoPath: "github.com/acme/billing-api",
  },
  {
    slug: "auth-service",
    name: "auth-service",
    description: "Central authentication and session management for all internal apps.",
    owner: "Platform team",
    type: "api",
    stack: ["Go", "Redis"],
    status: "healthy",
    docsPath: "docs.internal/auth-service",
    repoPath: "github.com/acme/auth-service",
  },
  {
    slug: "customer-portal",
    name: "customer-portal",
    description: "Customer-facing account management and support dashboard.",
    owner: "Growth team",
    type: "frontend",
    stack: ["Next.js", "TypeScript"],
    status: "degraded",
    docsPath: "docs.internal/customer-portal",
    repoPath: "github.com/acme/customer-portal",
  },
  {
    slug: "notifications-worker",
    name: "notifications-worker",
    description: "Async email, SMS, and push notification delivery queue.",
    owner: "Platform team",
    type: "worker",
    stack: ["Python", "Celery"],
    status: "healthy",
    docsPath: "docs.internal/notifications-worker",
    repoPath: "github.com/acme/notifications-worker",
  },
  {
    slug: "analytics-pipeline",
    name: "analytics-pipeline",
    description: "Nightly ETL job aggregating product usage events into the warehouse.",
    owner: "Data team",
    type: "job",
    stack: ["Python", "Airflow"],
    status: "down",
    docsPath: "docs.internal/analytics-pipeline",
    repoPath: "github.com/acme/analytics-pipeline",
  },
  {
    slug: "payments-db",
    name: "payments-db",
    description: "Primary transactional store for billing-api and payments-related services.",
    owner: "Payments team",
    type: "database",
    stack: ["PostgreSQL"],
    status: "healthy",
    docsPath: "docs.internal/payments-db",
    repoPath: "github.com/acme/payments-db",
  },
  {
    slug: "legacy-reporting",
    name: "legacy-reporting",
    description: "Pre-2024 reporting dashboard, scheduled for sunset once analytics-pipeline v2 ships.",
    owner: "Data team",
    type: "frontend",
    stack: ["Rails"],
    status: "deprecated",
    docsPath: "docs.internal/legacy-reporting",
    repoPath: "github.com/acme/legacy-reporting",
  },
];

export function getServices(): Service[] {
  return SERVICES;
}

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export const STATUS_LABEL: Record<ServiceStatus, string> = {
  healthy: "Healthy",
  degraded: "Degraded",
  down: "Down",
  deprecated: "Deprecated",
};

export const STATUS_DOT: Record<ServiceStatus, string> = {
  healthy: "bg-emerald-500",
  degraded: "bg-primary",
  down: "bg-red-500",
  deprecated: "bg-muted-foreground/40",
};

export const TYPE_LABEL: Record<ServiceType, string> = {
  api: "API",
  frontend: "Frontend",
  worker: "Worker",
  database: "Database",
  job: "Job",
};
