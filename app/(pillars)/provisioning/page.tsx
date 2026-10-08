import ProvisionForm from "@/components/ProvisionForm";

export default function ProvisioningPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif italic text-2xl tracking-tight">Provisioning</h1>
        <p className="mt-1 max-w-lg text-sm text-muted-foreground">
          Pick a service and an environment. This simulates the provisioning flow — no real
          infrastructure is created.
        </p>
      </div>
      <ProvisionForm />
    </div>
  );
}
