import { getServices, type ServiceStatus, type ServiceType } from "./services";
import { getRuns } from "./pipelines";
import docsIndex from "./docs-index.json";

export const ENVIRONMENT_COUNT = 3; // development, staging, preview — see ProvisionForm

export type Delta = {
  direction: "up" | "down";
  percent: number;
  /** Demo-data caption — this app is openly simulated (see lib/pipelines.ts, Provisioning). */
  caption: string;
};

export type DashboardStats = {
  serviceCount: number;
  healthyCount: number;
  attentionCount: number; // degraded + down
  deprecatedCount: number;
  runCount: number;
  runningCount: number;
  successCount: number;
  failedCount: number;
  successRate: number; // success / (success + failed), rounded %
  docsIndexed: number;
  statusBreakdown: { status: ServiceStatus; count: number }[];
  typeBreakdown: { type: ServiceType; count: number }[];
};

export function getDashboardStats(): DashboardStats {
  const services = getServices();
  const runs = getRuns();

  const healthyCount = services.filter((s) => s.status === "healthy").length;
  const attentionCount = services.filter(
    (s) => s.status === "degraded" || s.status === "down"
  ).length;
  const deprecatedCount = services.filter((s) => s.status === "deprecated").length;

  const runningCount = runs.filter((r) => r.status === "running").length;
  const successCount = runs.filter((r) => r.status === "success").length;
  const failedCount = runs.filter((r) => r.status === "failed").length;
  const completed = successCount + failedCount;
  const successRate = completed > 0 ? Math.round((successCount / completed) * 100) : 0;

  const statusOrder: ServiceStatus[] = ["healthy", "degraded", "down", "deprecated"];
  const statusBreakdown = statusOrder.map((status) => ({
    status,
    count: services.filter((s) => s.status === status).length,
  }));

  const typeOrder: ServiceType[] = ["api", "frontend", "worker", "database", "job"];
  const typeBreakdown = typeOrder
    .map((type) => ({ type, count: services.filter((s) => s.type === type).length }))
    .filter((t) => t.count > 0);

  return {
    serviceCount: services.length,
    healthyCount,
    attentionCount,
    deprecatedCount,
    runCount: runs.length,
    runningCount,
    successCount,
    failedCount,
    successRate,
    docsIndexed: docsIndex.length,
    statusBreakdown,
    typeBreakdown,
  };
}

/**
 * Fabricated-but-labeled trend deltas for the stat cards. Janus has no real
 * historical metrics store, so these are small, plausible demo deltas in the
 * same spirit as the seeded pipeline runs and the simulated Provisioning
 * stream — not a claim about real production history.
 */
export const DEMO_DELTAS: Record<"services" | "healthy" | "pipelines" | "docs", Delta> = {
  services: { direction: "up", percent: 8, caption: "+1 vs last week" },
  healthy: { direction: "down", percent: 11, caption: "-1 vs last week" },
  pipelines: { direction: "up", percent: 12, caption: "+3 runs vs last week" },
  docs: { direction: "up", percent: 23, caption: "+3 docs vs last week" },
};

export type DailyRuns = { date: string; label: string; shortLabel: string; runs: number };

// Deterministic PRNG (mulberry32) so the synthetic series is stable across
// server and client renders instead of drifting with Math.random().
function mulberry32(seed: number) {
  let state = seed;
  return function random() {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Fixed anchor date keeps the demo series static (and build-time safe) rather
// than keyed off the real clock — consistent with the rest of Janus's seeded,
// openly-simulated demo data.
const ANCHOR_DATE = new Date("2026-10-08T00:00:00Z");

/** Synthetic "pipeline runs per day" series for the dashboard chart. */
export function getRunsSeries(days = 30): DailyRuns[] {
  const rand = mulberry32(190820);
  const out: DailyRuns[] = [];

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(ANCHOR_DATE);
    d.setUTCDate(ANCHOR_DATE.getUTCDate() - i);
    const dow = d.getUTCDay();
    const weekendDip = dow === 0 || dow === 6 ? 0.5 : 1;
    const wave = Math.sin(i / 3.2) * 2.4;
    const noise = (rand() - 0.5) * 4.5;
    const runs = Math.max(1, Math.round((7 + wave + noise) * weekendDip));

    out.push({
      date: d.toISOString().slice(0, 10),
      label: d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", timeZone: "UTC" }),
      shortLabel: d.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" }),
      runs,
    });
  }
  return out;
}

export type WeekdayOutcome = {
  weekday: string;
  success: number;
  failed: number;
  running: number;
};

/**
 * Aggregates the synthetic daily series into weekday buckets split by the
 * app's real success/failed/running ratio, for the grouped bar chart.
 */
export function getWeekdayOutcomes(): WeekdayOutcome[] {
  const series = getRunsSeries(28);
  const stats = getDashboardStats();
  const total = stats.successCount + stats.failedCount + stats.runningCount || 1;
  const successShare = stats.successCount / total;
  const failedShare = stats.failedCount / total;

  const order = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const buckets = new Map<string, number[]>(order.map((w) => [w, []]));

  for (const day of series) {
    const d = new Date(`${day.date}T00:00:00Z`);
    const weekday = d.toLocaleDateString("en-US", { weekday: "short", timeZone: "UTC" });
    if (buckets.has(weekday)) buckets.get(weekday)!.push(day.runs);
  }

  return order.map((weekday) => {
    const values = buckets.get(weekday) ?? [];
    const sum = values.reduce((a, b) => a + b, 0);
    const avg = values.length ? sum / values.length : 0;
    const success = Math.round(avg * successShare);
    const failed = Math.round(avg * failedShare);
    const running = Math.max(0, Math.round(avg) - success - failed);
    return { weekday, success, failed, running };
  });
}
