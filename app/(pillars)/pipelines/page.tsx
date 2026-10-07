export default function PipelinesPage() {
  return (
    <div className="flex items-start gap-3 py-4">
      <span className="mt-1.5 size-1.5 rounded-full shrink-0 bg-muted-foreground/40" />
      <div>
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-medium">Pipeline status</h3>
          <span className="text-xs text-muted-foreground">Planned</span>
        </div>
        <p className="text-sm text-muted-foreground mt-1 max-w-lg">
          A mocked CI/CD view — runs with success / failed / running states.
        </p>
      </div>
    </div>
  );
}
