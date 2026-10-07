import ProvisionForm from "@/components/ProvisionForm";

export default function ProvisioningPage() {
  return (
    <div>
      <p className="text-sm text-muted-foreground mb-6 max-w-lg">
        Pick a service and an environment. This simulates the provisioning flow — no real
        infrastructure is created.
      </p>
      <ProvisionForm />
    </div>
  );
}
