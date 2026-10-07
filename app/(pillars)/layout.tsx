import { Suspense } from "react";
import PillarNav from "@/components/PillarNav";

export default function PillarsLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="font-serif italic text-4xl tracking-tight">Janus</h1>
      <p className="text-muted-foreground mt-2 max-w-xl text-sm">
        A self-service developer platform, in miniature. Named for the Roman god of gates and
        transitions — the door into your environments, services, and pipelines.
      </p>

      <div className="mt-8">
        <Suspense fallback={<div className="h-[29px] border-b" />}>
          <PillarNav />
        </Suspense>
      </div>

      <div className="mt-6">{children}</div>
    </main>
  );
}
