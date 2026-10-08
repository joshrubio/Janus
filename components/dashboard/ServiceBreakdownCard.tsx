"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { STATUS_LABEL, STATUS_DOT, TYPE_LABEL, type ServiceStatus, type ServiceType } from "@/lib/services";

type StatusRow = { status: ServiceStatus; count: number };
type TypeRow = { type: ServiceType; count: number };

export default function ServiceBreakdownCard({
  statusBreakdown,
  typeBreakdown,
  total,
}: {
  statusBreakdown: StatusRow[];
  typeBreakdown: TypeRow[];
  total: number;
}) {
  const visibleStatus = statusBreakdown.filter((s) => s.count > 0);

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Services</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="status">
          <TabsList variant="line">
            <TabsTrigger value="status">By status</TabsTrigger>
            <TabsTrigger value="type">By type</TabsTrigger>
          </TabsList>

          <TabsContent value="status" className="mt-4">
            <div className="flex h-2.5 w-full gap-0.5 overflow-hidden rounded-full">
              {visibleStatus.map((row) => (
                <div
                  key={row.status}
                  className={`${STATUS_DOT[row.status]} h-full rounded-full`}
                  style={{ width: `${(row.count / total) * 100}%` }}
                  title={`${STATUS_LABEL[row.status]}: ${row.count}`}
                />
              ))}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {visibleStatus.map((row) => (
                <div key={row.status}>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className={`size-1.5 rounded-full ${STATUS_DOT[row.status]}`} />
                    {STATUS_LABEL[row.status]}
                  </div>
                  <p className="mt-1 font-mono text-sm">
                    {row.count}
                    <span className="text-muted-foreground/60">/{total}</span>
                  </p>
                  <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className={`h-full rounded-full ${STATUS_DOT[row.status]}`}
                      style={{ width: `${(row.count / total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="type" className="mt-4">
            <div className="flex h-2.5 w-full gap-0.5 overflow-hidden rounded-full">
              {typeBreakdown.map((row) => (
                <div
                  key={row.type}
                  className="h-full rounded-full bg-foreground/70"
                  style={{ width: `${(row.count / total) * 100}%` }}
                  title={`${TYPE_LABEL[row.type]}: ${row.count}`}
                />
              ))}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {typeBreakdown.map((row) => (
                <div key={row.type}>
                  <div className="text-xs text-muted-foreground">{TYPE_LABEL[row.type]}</div>
                  <p className="mt-1 font-mono text-sm">
                    {row.count}
                    <span className="text-muted-foreground/60">/{total}</span>
                  </p>
                  <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-foreground/70"
                      style={{ width: `${(row.count / total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
