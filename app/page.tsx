import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const PILLARS = [
  {
    title: "Service catalog",
    status: "Next up",
    description:
      "A list of internal services — owner, stack, status, docs link. The simplest pillar to demonstrate first.",
  },
  {
    title: "Environment provisioning",
    status: "Planned",
    description:
      "A self-service form simulating provisioning: pick a service + environment, watch a progress log stream in, get an output URL. Never touches real infrastructure — the UX of the flow is the point.",
  },
  {
    title: "Pipeline status",
    status: "Planned",
    description: "A mocked CI/CD view — runs with success / failed / running states.",
  },
  {
    title: "RAG assistant",
    status: "Planned",
    description:
      "A chatbot over this project's own internal docs, reusing the same Supabase + pgvector + Voyage embeddings pattern built for Siegfried.",
  },
];

export default function Home() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight">Janus</h1>
      <p className="text-muted-foreground mt-3 max-w-xl">
        A self-service developer platform, in miniature — the kind of tooling a Platform
        Engineering team builds for its own engineers. Named for the Roman god of gates and
        transitions: this is the door into your environments, services, and pipelines.
      </p>

      <Separator className="my-8" />

      <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-4">
        The four pillars
      </h2>
      <div className="grid gap-3">
        {PILLARS.map((pillar) => (
          <Card key={pillar.title}>
            <CardHeader className="flex-row items-center justify-between gap-2 space-y-0">
              <h3 className="font-medium">{pillar.title}</h3>
              <Badge variant="secondary">{pillar.status}</Badge>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{pillar.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
