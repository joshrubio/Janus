import Link from "next/link";
import { getServices, STATUS_LABEL, STATUS_DOT, TYPE_LABEL } from "@/lib/services";

export default function CatalogPage() {
  const services = getServices();

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif italic text-2xl tracking-tight">Catalog</h1>
        <p className="mt-1 max-w-lg text-sm text-muted-foreground">
          Every service Janus knows about — ownership, stack, and current status.
        </p>
      </div>

      <div className="divide-y divide-border">
      {services.map((service) => (
        <Link
          key={service.slug}
          href={`/catalog/${service.slug}`}
          className="flex items-start gap-3 py-4 -mx-2 px-2 rounded-lg hover:bg-accent transition-colors"
        >
          <span
            className={`mt-1.5 size-1.5 rounded-full shrink-0 ${STATUS_DOT[service.status]}`}
            title={STATUS_LABEL[service.status]}
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <h3 className="text-sm font-medium font-mono">{service.name}</h3>
                <span className="text-xs text-muted-foreground shrink-0">
                  {TYPE_LABEL[service.type]}
                </span>
              </div>
              <span className="text-xs text-muted-foreground shrink-0">
                {STATUS_LABEL[service.status]}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
              {service.description}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-muted-foreground">{service.owner}</span>
              <span className="text-muted-foreground/40">·</span>
              {service.stack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono text-muted-foreground bg-muted rounded px-1.5 py-0.5"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </Link>
      ))}
      </div>
    </div>
  );
}
