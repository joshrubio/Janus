import { ArrowDown, ArrowUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardAction } from "@/components/ui/card";
import type { Delta } from "@/lib/dashboard-data";

export default function StatCard({
  label,
  value,
  delta,
  caption,
}: {
  label: string;
  value: string;
  delta?: Delta;
  caption: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </CardTitle>
        {delta && (
          <CardAction>
            <span
              className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[11px] font-medium ${
                delta.direction === "up"
                  ? "bg-emerald-500/10 text-emerald-500"
                  : "bg-red-500/10 text-red-500"
              }`}
            >
              {delta.direction === "up" ? (
                <ArrowUp className="size-3" />
              ) : (
                <ArrowDown className="size-3" />
              )}
              {delta.percent}%
            </span>
          </CardAction>
        )}
      </CardHeader>
      <CardContent>
        <p className="font-serif text-3xl tracking-tight">{value}</p>
        <p className="mt-1 text-xs text-muted-foreground/60">{caption}</p>
      </CardContent>
    </Card>
  );
}
