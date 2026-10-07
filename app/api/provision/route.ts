import { NextRequest } from "next/server";
import { getService } from "@/lib/services";

const ENVIRONMENTS = ["development", "staging", "preview"] as const;
type Environment = (typeof ENVIRONMENTS)[number];

function steps(serviceSlug: string, environment: string) {
  return [
    `Allocating ${environment} environment for ${serviceSlug}…`,
    `Pulling image ${serviceSlug}:latest…`,
    `Provisioning network and DNS…`,
    `Applying environment variables and secrets…`,
    `Starting container…`,
    `Running health checks…`,
    `Environment ready.`,
  ];
}

function randomSuffix() {
  return Math.random().toString(36).slice(2, 8);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const serviceSlug: string = body.serviceSlug;
  const environment: Environment = body.environment;

  const service = getService(serviceSlug);
  if (!service || !ENVIRONMENTS.includes(environment)) {
    return new Response(JSON.stringify({ error: "Unknown service or environment" }), {
      status: 400,
    });
  }

  const encoder = new TextEncoder();
  const log = steps(serviceSlug, environment);

  const stream = new ReadableStream({
    async start(controller) {
      for (const line of log) {
        await new Promise((r) => setTimeout(r, 450 + Math.random() * 350));
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ line })}\n\n`));
      }
      const url = `https://${serviceSlug}-${environment}-${randomSuffix()}.janus.dev`;
      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ done: true, url })}\n\n`));
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
