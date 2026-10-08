"use client";

import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import type { DailyRuns } from "@/lib/dashboard-data";

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { payload: DailyRuns }[];
}) {
  if (!active || !payload?.length) return null;
  const point = payload[0].payload;
  return (
    <div className="rounded-md border bg-popover px-3 py-2 text-xs shadow-md ring-1 ring-foreground/10">
      <p className="font-medium text-foreground">{point.label}</p>
      <p className="mt-0.5 text-muted-foreground">
        Runs <span className="font-mono text-foreground">{point.runs}</span>
      </p>
    </div>
  );
}

function CustomTick(props: {
  x?: number;
  y?: number;
  payload?: { value: string };
  data?: DailyRuns[];
  highlightIndex?: number | null;
}) {
  const { x = 0, y = 0, payload, data = [], highlightIndex = null } = props;
  const value = payload?.value ?? "";
  const idx = data.findIndex((d) => d.label === value);
  const active = idx !== -1 && idx === highlightIndex;
  const point = data[idx];
  const text = point?.shortLabel ?? value;

  return (
    <g transform={`translate(${x},${y})`}>
      {active && (
        <rect x={-26} y={6} width={52} height={18} rx={9} style={{ fill: "var(--primary)" }} />
      )}
      <text
        x={0}
        y={active ? 15 : 18}
        textAnchor="middle"
        className={active ? "text-[10px] font-medium" : "text-[10px]"}
        style={{ fill: active ? "var(--primary-foreground)" : "var(--muted-foreground)" }}
      >
        {text}
      </text>
    </g>
  );
}

export default function RunsChart({ data }: { data: DailyRuns[] }) {
  const [activeLabel, setActiveLabel] = useState<string | null>(null);

  const tickIndices = useMemo(() => {
    const step = Math.max(1, Math.floor(data.length / 6));
    const indices: number[] = [];
    for (let i = 0; i < data.length; i += step) indices.push(i);
    if (indices[indices.length - 1] !== data.length - 1) indices.push(data.length - 1);
    return indices;
  }, [data.length]);

  const highlightIndex = useMemo(() => {
    if (activeLabel == null) return null;
    const hoveredIdx = data.findIndex((d) => d.label === activeLabel);
    if (hoveredIdx === -1) return null;
    let nearest = tickIndices[0];
    let best = Infinity;
    for (const idx of tickIndices) {
      const dist = Math.abs(idx - hoveredIdx);
      if (dist < best) {
        best = dist;
        nearest = idx;
      }
    }
    return nearest;
  }, [activeLabel, data, tickIndices]);

  const tickValues = tickIndices.map((i) => data[i]?.label).filter(Boolean) as string[];

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 8, left: 8, bottom: 0 }}
          onMouseMove={(state) => {
            const label = typeof state.activeLabel === "string" ? state.activeLabel : null;
            setActiveLabel(label);
          }}
          onMouseLeave={() => setActiveLabel(null)}
        >
          <defs>
            <linearGradient id="runsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" style={{ stopColor: "var(--primary)", stopOpacity: 0.35 }} />
              <stop offset="95%" style={{ stopColor: "var(--primary)", stopOpacity: 0 }} />
            </linearGradient>
          </defs>
          <CartesianGrid
            vertical={false}
            strokeDasharray="3 5"
            style={{ stroke: "var(--border)" }}
          />
          <XAxis
            dataKey="label"
            ticks={tickValues}
            interval={0}
            axisLine={false}
            tickLine={false}
            tick={<CustomTick data={data} highlightIndex={highlightIndex} />}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: "var(--primary)", strokeDasharray: "3 3", strokeWidth: 1 }}
          />
          <Area
            type="monotone"
            dataKey="runs"
            stroke="var(--primary)"
            strokeWidth={2}
            fill="url(#runsGradient)"
            dot={false}
            activeDot={{ r: 4, style: { fill: "var(--primary)", stroke: "var(--background)", strokeWidth: 2 } }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
