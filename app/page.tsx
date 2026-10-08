import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatCard from "@/components/dashboard/StatCard";
import RunsChart from "@/components/dashboard/RunsChart";
import ServiceBreakdownCard from "@/components/dashboard/ServiceBreakdownCard";
import ReliabilityCard from "@/components/dashboard/ReliabilityCard";
import PillarLinksGrid from "@/components/dashboard/PillarLinksGrid";
import {
  getDashboardStats,
  getRunsSeries,
  getWeekdayOutcomes,
  DEMO_DELTAS,
  ENVIRONMENT_COUNT,
} from "@/lib/dashboard-data";

export default function DashboardPage() {
  const stats = getDashboardStats();
  const series = getRunsSeries(30);
  const weekdayOutcomes = getWeekdayOutcomes();
  const totalSeriesRuns = series.reduce((sum, d) => sum + d.runs, 0);

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8">
        <h1 className="font-serif italic text-2xl tracking-tight">Dashboard</h1>
        <p className="mt-1 max-w-xl text-sm text-muted-foreground">
          An overview of Janus&apos;s services, pipelines, and docs — the self-service developer
          platform, in miniature.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <StatCard
              label="Services"
              value={String(stats.serviceCount)}
              delta={DEMO_DELTAS.services}
              caption={DEMO_DELTAS.services.caption}
            />
            <StatCard
              label="Healthy"
              value={`${Math.round((stats.healthyCount / stats.serviceCount) * 100)}%`}
              delta={DEMO_DELTAS.healthy}
              caption={`${stats.healthyCount} of ${stats.serviceCount} services`}
            />
            <StatCard
              label="Pipeline runs"
              value={String(stats.runCount)}
              delta={DEMO_DELTAS.pipelines}
              caption={`${stats.runningCount} running · ${stats.failedCount} failed`}
            />
            <StatCard
              label="Docs indexed"
              value={String(stats.docsIndexed)}
              delta={DEMO_DELTAS.docs}
              caption={DEMO_DELTAS.docs.caption}
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Pipeline runs over time</CardTitle>
              <p className="text-sm text-muted-foreground">
                {totalSeriesRuns.toLocaleString()} runs across the last 30 days (synthetic demo
                series, same spirit as the seeded pipeline runs below).
              </p>
            </CardHeader>
            <CardContent>
              <RunsChart data={series} />
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          <ServiceBreakdownCard
            statusBreakdown={stats.statusBreakdown}
            typeBreakdown={stats.typeBreakdown}
            total={stats.serviceCount}
          />
          <ReliabilityCard
            className="flex-1"
            successRate={stats.successRate}
            weekdayOutcomes={weekdayOutcomes}
          />
        </div>
      </div>

      <div className="mt-10">
        <h2 className="mb-4 text-sm font-medium text-muted-foreground">Jump in</h2>
        <PillarLinksGrid
          serviceCount={stats.serviceCount}
          environmentCount={ENVIRONMENT_COUNT}
          runningCount={stats.runningCount}
          docsIndexed={stats.docsIndexed}
        />
      </div>
    </main>
  );
}
