import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

type Row = {
  title: string;
  description: string;
  status: "next-up" | "planned";
};

const PILLARS: { value: string; label: string; rows: Row[] }[] = [
  {
    value: "catalog",
    label: "Catalog",
    rows: [
      {
        title: "Service catalog",
        description:
          "A list of internal services — owner, stack, status, docs link. The simplest pillar to demonstrate first.",
        status: "next-up",
      },
    ],
  },
  {
    value: "provisioning",
    label: "Provisioning",
    rows: [
      {
        title: "Environment provisioning",
        description:
          "A self-service form simulating provisioning: pick a service + environment, watch a progress log stream in, get an output URL. Never touches real infrastructure — the UX of the flow is the point.",
        status: "planned",
      },
    ],
  },
  {
    value: "pipelines",
    label: "Pipelines",
    rows: [
      {
        title: "Pipeline status",
        description: "A mocked CI/CD view — runs with success / failed / running states.",
        status: "planned",
      },
    ],
  },
  {
    value: "assistant",
    label: "Assistant",
    rows: [
      {
        title: "RAG assistant",
        description:
          "A chatbot over this project's own internal docs, reusing the same Supabase + pgvector + Voyage embeddings pattern built for Siegfried.",
        status: "planned",
      },
    ],
  },
];

const STATUS_LABEL: Record<Row["status"], string> = {
  "next-up": "Next up",
  planned: "Planned",
};

const STATUS_DOT: Record<Row["status"], string> = {
  "next-up": "bg-primary",
  planned: "bg-muted-foreground/40",
};

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="font-serif italic text-4xl tracking-tight">Janus</h1>
      <p className="text-muted-foreground mt-2 max-w-xl text-sm">
        A self-service developer platform, in miniature. Named for the Roman god of gates and
        transitions — the door into your environments, services, and pipelines.
      </p>

      <Tabs defaultValue="catalog" className="mt-8">
        <TabsList variant="line" className="w-full justify-start gap-6 bg-transparent p-0 h-auto">
          {PILLARS.map((pillar) => (
            <TabsTrigger
              key={pillar.value}
              value={pillar.value}
              className="px-0 pb-3 data-active:bg-transparent data-active:shadow-none data-active:text-foreground after:bg-primary"
            >
              {pillar.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {PILLARS.map((pillar) => (
          <TabsContent key={pillar.value} value={pillar.value} className="mt-2">
            <div className="divide-y divide-border">
              {pillar.rows.map((row) => (
                <div key={row.title} className="flex items-start gap-3 py-4">
                  <span className={`mt-1.5 size-1.5 rounded-full shrink-0 ${STATUS_DOT[row.status]}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm font-medium">{row.title}</h3>
                      <span className="text-xs text-muted-foreground shrink-0">
                        {STATUS_LABEL[row.status]}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{row.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </main>
  );
}
