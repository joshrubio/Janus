"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const PILLARS = [
  { href: "/catalog", label: "Catalog" },
  { href: "/provisioning", label: "Provisioning" },
  { href: "/pipelines", label: "Pipelines" },
  { href: "/assistant", label: "Assistant" },
];

export default function PillarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-6 border-b">
      {PILLARS.map((pillar) => {
        const active = pathname === pillar.href || pathname.startsWith(pillar.href + "/");
        return (
          <Link
            key={pillar.href}
            href={pillar.href}
            className={`relative pb-3 text-sm transition-colors ${
              active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {pillar.label}
            {active && (
              <span className="absolute inset-x-0 -bottom-px h-0.5 bg-primary rounded-full" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
