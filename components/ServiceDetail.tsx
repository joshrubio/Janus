import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getService, STATUS_LABEL, STATUS_DOT, TYPE_LABEL } from "@/lib/services";

export default async function ServiceDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <div>
      <Link
        href="/catalog"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        Catalog
      </Link>

      <div className="flex items-center gap-2 mt-4">
        <h2 className="text-xl font-mono font-medium">{service.name}</h2>
        <span className="text-xs text-muted-foreground border rounded-full px-2 py-0.5">
          {TYPE_LABEL[service.type]}
        </span>
      </div>

      <p className="text-sm text-muted-foreground mt-2 max-w-lg">{service.description}</p>

      <div className="flex items-center gap-1.5 mt-3">
        <span className={`size-1.5 rounded-full ${STATUS_DOT[service.status]}`} />
        <span className="text-sm">{STATUS_LABEL[service.status]}</span>
      </div>

      <dl className="grid grid-cols-2 gap-4 mt-8 max-w-sm">
        <div>
          <dt className="text-xs text-muted-foreground uppercase tracking-wide">Owner</dt>
          <dd className="text-sm mt-1">{service.owner}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground uppercase tracking-wide">Stack</dt>
          <dd className="flex flex-wrap gap-1 mt-1">
            {service.stack.map((tech) => (
              <span
                key={tech}
                className="text-xs font-mono text-muted-foreground bg-muted rounded px-1.5 py-0.5"
              >
                {tech}
              </span>
            ))}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground uppercase tracking-wide">Docs</dt>
          <dd className="text-sm mt-1 font-mono text-muted-foreground">{service.docsPath}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground uppercase tracking-wide">Repository</dt>
          <dd className="text-sm mt-1 font-mono text-muted-foreground">{service.repoPath}</dd>
        </div>
      </dl>

      <p className="text-xs text-muted-foreground/70 mt-10">
        Docs and repository links are illustrative — this is a portfolio demo, not a live catalog.
      </p>
    </div>
  );
}
