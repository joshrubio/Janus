"use client";

import Link from "next/link";
import { BookOpen, GitBranch, MessageCircle, Rocket } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function PillarLinksGrid({
  serviceCount,
  environmentCount,
  runningCount,
  docsIndexed,
}: {
  serviceCount: number;
  environmentCount: number;
  runningCount: number;
  docsIndexed: number;
}) {
  const pillars = [
    {
      href: "/catalog",
      icon: BookOpen,
      name: "Catalog",
      description: "Browse services, owners, and stacks.",
      stat: `${serviceCount} services`,
    },
    {
      href: "/provisioning",
      icon: Rocket,
      name: "Provisioning",
      description: "Spin up a simulated environment.",
      stat: `${environmentCount} environments`,
    },
    {
      href: "/pipelines",
      icon: GitBranch,
      name: "Pipelines",
      description: "CI runs grouped by status.",
      stat: `${runningCount} running now`,
    },
  ] as const;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {pillars.map((p) => (
        <Link key={p.href} href={p.href}>
          <Card className="h-full transition-colors hover:bg-accent/50">
            <div className="flex flex-col gap-2 px-4">
              <p.icon className="size-4 text-primary" />
              <p className="text-sm font-medium">{p.name}</p>
              <p className="text-xs text-muted-foreground">{p.description}</p>
              <p className="mt-1 font-mono text-xs text-muted-foreground/60">{p.stat}</p>
            </div>
          </Card>
        </Link>
      ))}

      <button
        type="button"
        onClick={() => window.dispatchEvent(new CustomEvent("open-assistant"))}
        className="text-left"
      >
        <Card className="h-full transition-colors hover:bg-accent/50">
          <div className="flex flex-col gap-2 px-4">
            <MessageCircle className="size-4 text-primary" />
            <p className="text-sm font-medium">Assistant</p>
            <p className="text-xs text-muted-foreground">Ask about Janus or an incident.</p>
            <p className="mt-1 font-mono text-xs text-muted-foreground/60">
              {docsIndexed} docs indexed
            </p>
          </div>
        </Card>
      </button>
    </div>
  );
}
