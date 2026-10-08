"use client";

import { useState } from "react";
import { ArrowUp, Loader2, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Source = { source: string; title: string; score: number };
type Message = { role: "user" | "assistant"; content: string; sources?: Source[] };

const SUGGESTIONS = [
  "What does billing-api do?",
  "How do I provision a staging environment?",
  "What should I check if auth-service causes a mass logout?",
  "What happens when a pipeline run fails?",
];

function uniqueSources(sources: Source[]): Source[] {
  return Array.from(new Map(sources.map((s) => [s.source, s])).values());
}

export default function AssistantChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function ask(question: string) {
    if (!question.trim() || loading) return;
    setMessages((prev) => [...prev, { role: "user", content: question }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.answer, sources: data.sources },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: err instanceof Error ? err.message : "Something went wrong.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {messages.length === 0 && (
        <div className="grid gap-1.5 mb-6">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => ask(s)}
              className="text-left text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md px-2 py-1.5 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-4 mb-6">
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "text-sm font-medium" : "text-sm"}>
            {m.role === "user" ? (
              <p>{m.content}</p>
            ) : (
              <div>
                <p className="text-muted-foreground">{m.content}</p>
                {m.sources && m.sources.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {uniqueSources(m.sources).map((s) => (
                      <span
                        key={s.source}
                        className="inline-flex items-center gap-1 text-xs text-muted-foreground/60 border rounded-full px-2 py-0.5"
                      >
                        <FileText className="size-3" />
                        {s.source}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="size-3.5 animate-spin" />
            Thinking…
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          ask(input);
        }}
        className="flex gap-2"
      >
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about Janus, a service, or an incident…"
          disabled={loading}
        />
        <Button type="submit" size="icon" disabled={loading || !input.trim()}>
          <ArrowUp className="size-4" />
        </Button>
      </form>
    </div>
  );
}
