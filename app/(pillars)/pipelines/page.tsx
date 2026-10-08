import { CircleCheck, CircleX, LoaderCircle } from "lucide-react";
import { getRuns, STATUS_LABEL, type RunStatus } from "@/lib/pipelines";
import Avatar from "@/components/Avatar";

const STATUS_ORDER: RunStatus[] = ["running", "failed", "success"];

const STATUS_ICON: Record<RunStatus, React.ReactNode> = {
  running: <LoaderCircle className="size-4 text-primary animate-spin" />,
  failed: <CircleX className="size-4 text-red-500" />,
  success: <CircleCheck className="size-4 text-emerald-500" />,
};

export default function PipelinesPage() {
  const runs = getRuns();

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif italic text-2xl tracking-tight">Pipelines</h1>
        <p className="mt-1 max-w-lg text-sm text-muted-foreground">
          Recent CI runs across every service, grouped by status.
        </p>
      </div>

      <div className="grid gap-6">
      {STATUS_ORDER.map((status) => {
        const group = runs.filter((r) => r.status === status);
        if (group.length === 0) return null;
        return (
          <div key={status}>
            <div className="flex items-center gap-2 mb-1 text-xs text-muted-foreground/60 uppercase tracking-wide">
              {STATUS_LABEL[status]}
              <span>{group.length}</span>
            </div>
            <div className="divide-y divide-border">
              {group.map((run) => (
                <div
                  key={run.id}
                  className="group flex items-center gap-3 py-2.5 -mx-2 px-2 rounded-md hover:bg-accent transition-colors"
                >
                  {STATUS_ICON[run.status]}
                  <span className="text-xs font-mono text-muted-foreground/60 w-16 shrink-0">
                    {run.commitSha}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono">{run.serviceSlug}</span>
                      <span className="text-sm text-muted-foreground truncate">
                        {run.commitMessage}
                      </span>
                    </div>
                  </div>
                  <span className="hidden group-hover:inline text-xs text-muted-foreground/60 font-mono shrink-0">
                    {run.branch}
                  </span>
                  <span className="text-xs text-muted-foreground/60 w-20 text-right shrink-0">
                    {run.duration}
                  </span>
                  <span className="text-xs text-muted-foreground/60 w-20 text-right shrink-0">
                    {run.startedAgo}
                  </span>
                  <Avatar name={run.author} />
                </div>
              ))}
            </div>
          </div>
        );
      })}
      </div>
    </div>
  );
}
