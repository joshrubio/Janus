"use client";

import { useEffect, useState } from "react";
import { MessageCircle, PanelLeftClose } from "lucide-react";
import AssistantChat from "@/components/AssistantChat";

export default function AssistantSidebar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onOpenRequest() {
      setOpen(true);
    }
    window.addEventListener("open-assistant", onOpenRequest);
    return () => window.removeEventListener("open-assistant", onOpenRequest);
  }, []);

  if (!open) {
    return (
      <aside className="sticky top-14 z-20 h-[calc(100vh-3.5rem)] w-12 shrink-0 border-r bg-background">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open assistant"
          title="Open assistant"
          className="flex h-full w-full flex-col items-center gap-1 pt-4 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <MessageCircle className="size-4 text-primary" />
        </button>
      </aside>
    );
  }

  return (
    <aside className="sticky top-14 z-20 flex h-[calc(100vh-3.5rem)] w-[380px] shrink-0 flex-col border-r bg-background">
      <div className="flex h-12 shrink-0 items-center justify-between border-b px-3">
        <div className="flex items-center gap-2 text-sm font-medium">
          <MessageCircle className="size-4 text-primary" />
          Assistant
        </div>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Collapse assistant"
          title="Collapse assistant"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          <PanelLeftClose className="size-4" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-3 py-4">
        <p className="mb-4 text-xs text-muted-foreground">
          Ask about Janus, a service, or an incident. Answers are grounded in the docs under{" "}
          <code className="font-mono text-xs">/docs</code> — retrieved by embedding similarity.
        </p>
        <AssistantChat />
      </div>
    </aside>
  );
}
