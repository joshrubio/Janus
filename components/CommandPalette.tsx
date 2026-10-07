"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Rocket,
  GitBranch,
  MessageCircle,
  Server,
} from "lucide-react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";
import { getServices } from "@/lib/services";

const PILLARS = [
  { href: "/catalog", label: "Catalog", icon: BookOpen },
  { href: "/provisioning", label: "Provisioning", icon: Rocket },
  { href: "/pipelines", label: "Pipelines", icon: GitBranch },
  { href: "/assistant", label: "Assistant", icon: MessageCircle },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const services = getServices();

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    }
    function onOpenRequest() {
      setOpen(true);
    }
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("open-command-palette", onOpenRequest);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("open-command-palette", onOpenRequest);
    };
  }, []);

  function go(href: string) {
    router.push(href);
    setOpen(false);
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen} title="Command palette">
      <Command>
        <CommandInput placeholder="Jump to a page or service…" />
        <CommandList>
          <CommandEmpty>No results.</CommandEmpty>
          <CommandGroup heading="Go to">
            {PILLARS.map((p) => (
              <CommandItem key={p.href} onSelect={() => go(p.href)}>
                <p.icon className="size-4" />
                {p.label}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Services">
            {services.map((s) => (
              <CommandItem key={s.slug} onSelect={() => go(`/catalog/${s.slug}`)}>
                <Server className="size-4" />
                <span className="font-mono">{s.name}</span>
                <CommandShortcut>{s.owner}</CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
