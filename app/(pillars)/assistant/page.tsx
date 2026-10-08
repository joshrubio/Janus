import AssistantChat from "@/components/AssistantChat";

export default function AssistantPage() {
  return (
    <div>
      <p className="text-sm text-muted-foreground mb-6 max-w-lg">
        Ask a question about Janus, a service, or an incident. Answers are grounded in the docs
        under <code className="font-mono text-xs">/docs</code> — retrieved by embedding
        similarity, not guessed.
      </p>
      <AssistantChat />
    </div>
  );
}
