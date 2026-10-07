export default function ProvisioningPage() {
  return (
    <div className="flex items-start gap-3 py-4">
      <span className="mt-1.5 size-1.5 rounded-full shrink-0 bg-muted-foreground/40" />
      <div>
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-medium">Environment provisioning</h3>
          <span className="text-xs text-muted-foreground">Planned</span>
        </div>
        <p className="text-sm text-muted-foreground mt-1 max-w-lg">
          A self-service form simulating provisioning: pick a service + environment, watch a
          progress log stream in, get an output URL. Never touches real infrastructure — the UX
          of the flow is the point.
        </p>
      </div>
    </div>
  );
}
