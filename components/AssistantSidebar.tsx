"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import AssistantChat from "@/components/AssistantChat";

export default function AssistantSidebar() {
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    function onOpenRequest() {
      setHovered(true);
    }
    window.addEventListener("open-assistant", onOpenRequest);
    return () => window.removeEventListener("open-assistant", onOpenRequest);
  }, []);

  return (
    <div
      className="relative z-20 h-[calc(100vh-3.5rem)] w-12 shrink-0 sticky top-14"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <aside
        className={`absolute inset-y-0 left-0 flex flex-col overflow-hidden border-r bg-background transition-[width] duration-150 ease-out ${
          hovered ? "w-[380px] shadow-xl" : "w-12"
        }`}
      >
        <div className="flex h-12 shrink-0 items-center border-b px-3">
          {hovered ? (
            <div className="flex items-center gap-2 text-sm font-medium">
              <MessageCircle className="size-4" />
              Assistant
            </div>
          ) : (
            <div className="flex w-full justify-center">
              <MessageCircle className="size-4" />
            </div>
          )}
        </div>

        {hovered && (
          <div className="flex-1 overflow-y-auto px-3 py-4">
            <p className="mb-4 text-xs text-muted-foreground">
              Ask about Janus, a service, or an incident. Answers are grounded in the docs under{" "}
              <code className="font-mono text-xs">/docs</code> — retrieved by embedding similarity.
            </p>
            <AssistantChat />
          </div>
        )}
      </aside>
    </div>
  );
}
