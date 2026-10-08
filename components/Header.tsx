"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Suspense, useEffect, useState } from "react";
import { Moon, Sun, Search, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeaderNav from "@/components/HeaderNav";
import { signOut } from "@/app/login/actions";

export default function Header() {
  const { setTheme, resolvedTheme } = useTheme();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // One-time hydration-safe mount flag (next-themes' own recommended
    // pattern) — intentionally synchronous, not a subscription.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (pathname === "/login") return null;

  return (
    <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between gap-8 px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="font-serif italic text-lg tracking-tight shrink-0">
            Janus
          </Link>
          <Suspense fallback={<div className="h-5 w-64" />}>
            <HeaderNav />
          </Suspense>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("open-command-palette"))}
            className="flex items-center gap-2 text-sm text-muted-foreground border rounded-md px-2.5 h-8 hover:text-foreground hover:bg-accent transition-colors"
          >
            <Search className="size-3.5" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden sm:inline text-[10px] border rounded px-1 py-0.5 text-muted-foreground/70 font-mono">
              ⌘K
            </kbd>
          </button>
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle theme"
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            >
              {resolvedTheme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </Button>
          )}
          <form action={signOut}>
            <Button variant="ghost" size="icon" type="submit" aria-label="Sign out" title="Sign out">
              <LogOut className="size-4" />
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
}
