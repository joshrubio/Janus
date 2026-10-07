"use client";

import { useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getServices } from "@/lib/services";

const ENVIRONMENTS = [
  { value: "development", label: "Development" },
  { value: "staging", label: "Staging" },
  { value: "preview", label: "Preview" },
];

type State = "idle" | "running" | "done";

export default function ProvisionForm() {
  const services = getServices();
  const [serviceSlug, setServiceSlug] = useState(services[0]?.slug ?? "");
  const [environment, setEnvironment] = useState(ENVIRONMENTS[0].value);
  const [state, setState] = useState<State>("idle");
  const [log, setLog] = useState<string[]>([]);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);

  async function provision(e: React.FormEvent) {
    e.preventDefault();
    setState("running");
    setLog([]);
    setOutputUrl(null);

    const res = await fetch("/api/provision", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ serviceSlug, environment }),
    });

    const reader = res.body?.getReader();
    const decoder = new TextDecoder();
    if (!reader) return;

    let buffer = "";
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      const parts = buffer.split("\n\n");
      buffer = parts.pop() ?? "";
      for (const part of parts) {
        if (!part.startsWith("data: ")) continue;
        const payload = JSON.parse(part.slice(6));
        if (payload.done) {
          setOutputUrl(payload.url);
          setState("done");
        } else {
          setLog((prev) => [...prev, payload.line]);
        }
      }
    }
  }

  function reset() {
    setState("idle");
    setLog([]);
    setOutputUrl(null);
  }

  return (
    <div>
      <form onSubmit={provision} className="flex flex-wrap items-end gap-3">
        <div className="grid gap-1.5">
          <label className="text-xs text-muted-foreground uppercase tracking-wide">
            Service
          </label>
          <Select
            value={serviceSlug}
            onValueChange={(v) => v && setServiceSlug(v)}
            disabled={state === "running"}
          >
            <SelectTrigger className="w-48 font-mono text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {services.map((s) => (
                <SelectItem key={s.slug} value={s.slug} className="font-mono text-sm">
                  {s.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-1.5">
          <label className="text-xs text-muted-foreground uppercase tracking-wide">
            Environment
          </label>
          <Select
            value={environment}
            onValueChange={(v) => v && setEnvironment(v)}
            disabled={state === "running"}
          >
            <SelectTrigger className="w-40 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ENVIRONMENTS.map((e) => (
                <SelectItem key={e.value} value={e.value}>
                  {e.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" disabled={state === "running"}>
          {state === "running" ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <ArrowRight className="size-4" />
          )}
          Provision
        </Button>

        {state === "done" && (
          <Button type="button" variant="ghost" onClick={reset}>
            Provision another
          </Button>
        )}
      </form>

      {(state === "running" || state === "done") && (
        <div className="mt-6 rounded-lg border bg-muted/40 p-4 font-mono text-xs">
          {log.map((line, i) => (
            <div key={i} className="flex items-center gap-2 py-0.5 text-muted-foreground">
              <Check className="size-3 text-emerald-500 shrink-0" />
              {line}
            </div>
          ))}
          {state === "running" && (
            <div className="flex items-center gap-2 py-0.5">
              <Loader2 className="size-3 animate-spin shrink-0" />
              <span className="text-muted-foreground">working…</span>
            </div>
          )}
        </div>
      )}

      {state === "done" && outputUrl && (
        <div className="mt-4 rounded-lg border border-primary/30 bg-primary/5 p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            Environment ready
          </p>
          <p className="font-mono text-sm mt-1">{outputUrl}</p>
          <p className="text-xs text-muted-foreground/70 mt-2">
            Illustrative URL — this is a portfolio demo, no real environment was created.
          </p>
        </div>
      )}
    </div>
  );
}
