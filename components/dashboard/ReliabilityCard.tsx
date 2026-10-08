"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { WeekdayOutcome } from "@/lib/dashboard-data";

const LEGEND = [
  { key: "success", label: "Success", colorClass: "bg-emerald-500" },
  { key: "failed", label: "Failed", colorClass: "bg-red-500" },
  { key: "running", label: "Running", colorClass: "bg-primary" },
] as const;

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { dataKey: string; value: number; color?: string }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md border bg-popover px-3 py-2 text-xs shadow-md ring-1 ring-foreground/10">
      <p className="font-medium text-foreground">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="mt-0.5 flex items-center gap-1.5 text-muted-foreground">
          <span className="font-mono text-foreground">{p.value}</span>
          {p.dataKey}
        </p>
      ))}
    </div>
  );
}

export default function ReliabilityCard({
  successRate,
  weekdayOutcomes,
  className,
}: {
  successRate: number;
  weekdayOutcomes: WeekdayOutcome[];
  className?: string;
}) {
  return (
    <Card className={`flex flex-col ${className ?? ""}`}>
      <CardHeader>
        <CardTitle>Pipeline reliability</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col">
        <div className="flex items-start gap-6">
          <div className="shrink-0">
            <p className="font-serif text-4xl tracking-tight">{successRate}%</p>
            <p className="mt-1 text-xs text-muted-foreground/60">success rate</p>
          </div>
          <div className="mt-1 flex flex-col gap-1.5">
            {LEGEND.map((l) => (
              <div key={l.key} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className={`size-1.5 rounded-full ${l.colorClass}`} />
                {l.label}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 min-h-32 w-full flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weekdayOutcomes} margin={{ top: 0, right: 0, left: 0, bottom: 0 }} barGap={2}>
              <CartesianGrid vertical={false} strokeDasharray="3 5" style={{ stroke: "var(--border)" }} />
              <XAxis
                dataKey="weekday"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--accent)" }} />
              <Bar dataKey="success" name="success" fill="#10b981" radius={[3, 3, 0, 0]} maxBarSize={10} />
              <Bar dataKey="failed" name="failed" fill="#ef4444" radius={[3, 3, 0, 0]} maxBarSize={10} />
              <Bar dataKey="running" name="running" fill="var(--primary)" radius={[3, 3, 0, 0]} maxBarSize={10} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
