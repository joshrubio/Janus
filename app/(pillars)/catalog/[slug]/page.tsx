import { Suspense } from "react";
import ServiceDetail from "@/components/ServiceDetail";

export default function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense fallback={<div className="h-40" />}>
      <ServiceDetail params={params} />
    </Suspense>
  );
}
