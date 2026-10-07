export default function AssistantPage() {
  return (
    <div className="flex items-start gap-3 py-4">
      <span className="mt-1.5 size-1.5 rounded-full shrink-0 bg-muted-foreground/40" />
      <div>
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-medium">RAG assistant</h3>
          <span className="text-xs text-muted-foreground">Planned</span>
        </div>
        <p className="text-sm text-muted-foreground mt-1 max-w-lg">
          A chatbot over this project&apos;s own internal docs, reusing the same Supabase +
          pgvector + Voyage embeddings pattern built for Siegfried.
        </p>
      </div>
    </div>
  );
}
