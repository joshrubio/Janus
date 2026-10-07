export type RunStatus = "success" | "failed" | "running";

export type PipelineRun = {
  id: string;
  serviceSlug: string;
  branch: string;
  commitSha: string;
  commitMessage: string;
  author: string;
  status: RunStatus;
  startedAgo: string;
  duration: string;
};

export const RUNS: PipelineRun[] = [
  {
    id: "run-1",
    serviceSlug: "billing-api",
    branch: "main",
    commitSha: "a1b2c3d",
    commitMessage: "Fix webhook retry backoff timing",
    author: "Dana Oyelaran",
    status: "running",
    startedAgo: "running now",
    duration: "—",
  },
  {
    id: "run-2",
    serviceSlug: "customer-portal",
    branch: "fix/account-settings-crash",
    commitSha: "9f3e7aa",
    commitMessage: "Guard against null billing address on settings page",
    author: "Marco Ibbi",
    status: "failed",
    startedAgo: "8 min ago",
    duration: "1m 42s",
  },
  {
    id: "run-5",
    serviceSlug: "analytics-pipeline",
    branch: "main",
    commitSha: "4de90bc",
    commitMessage: "Backfill Q3 usage events",
    author: "Priya Shah",
    status: "failed",
    startedAgo: "3h ago",
    duration: "0m 38s",
  },
  {
    id: "run-3",
    serviceSlug: "auth-service",
    branch: "main",
    commitSha: "c88d1fe",
    commitMessage: "Rotate session signing keys",
    author: "Dana Oyelaran",
    status: "success",
    startedAgo: "24 min ago",
    duration: "2m 11s",
  },
  {
    id: "run-4",
    serviceSlug: "notifications-worker",
    branch: "main",
    commitSha: "77aa210",
    commitMessage: "Add SMS delivery provider fallback",
    author: "Theo Van der Berg",
    status: "success",
    startedAgo: "1h ago",
    duration: "3m 05s",
  },
  {
    id: "run-6",
    serviceSlug: "billing-api",
    branch: "main",
    commitSha: "1120fab",
    commitMessage: "Add idempotency keys to invoice creation",
    author: "Marco Ibbi",
    status: "success",
    startedAgo: "5h ago",
    duration: "1m 58s",
  },
  {
    id: "run-7",
    serviceSlug: "payments-db",
    branch: "main",
    commitSha: "e02af91",
    commitMessage: "Add index on invoices.customer_id",
    author: "Priya Shah",
    status: "success",
    startedAgo: "1d ago",
    duration: "4m 22s",
  },
];

export function getRuns(): PipelineRun[] {
  return RUNS;
}

export const STATUS_LABEL: Record<RunStatus, string> = {
  running: "Running",
  failed: "Failed",
  success: "Success",
};

export function initials(name: string): string {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const AVATAR_HUES = [210, 280, 150, 20, 340, 50];

export function avatarHue(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_HUES[Math.abs(hash) % AVATAR_HUES.length];
}
