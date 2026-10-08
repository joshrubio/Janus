"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const PILLARS = [
  { href: "/catalog", label: "Catalog" },
  { href: "/provisioning", label: "Provisioning" },
  { href: "/pipelines", label: "Pipelines" },
];

export default function HeaderNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-6 sm:flex">
      {PILLARS.map((pillar) => {
        const active = pathname === pillar.href || pathname.startsWith(pillar.href + "/");
        return (
          <Link
            key={pillar.href}
            href={pillar.href}
            className={`relative py-2 text-sm transition-colors ${
              active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {pillar.label}
            {active && (
              <span className="absolute inset-x-0 -bottom-[1px] h-0.5 rounded-full bg-primary" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
