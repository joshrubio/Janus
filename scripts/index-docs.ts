// Usage: npx tsx scripts/index-docs.ts
// Reads docs/*.md, chunks by ## heading, embeds via Voyage, writes lib/docs-index.json.
// No database needed — the corpus is tiny, so in-process cosine similarity
// (lib/assistant.ts) is the right-sized choice over standing up pgvector.
import dotenv from "dotenv";
import path from "node:path";
dotenv.config({ path: path.join(__dirname, "..", ".env.local") });

import fs from "node:fs";
import { embed } from "../lib/embeddings";

const DOCS_DIR = path.join(__dirname, "..", "docs");
const OUT_PATH = path.join(__dirname, "..", "lib", "docs-index.json");

function chunkContent(content: string): { title: string; content: string }[] {
  const sections = content.split(/\n(?=## )/g).map((s) => s.trim()).filter(Boolean);
  return sections.map((s) => {
    const titleMatch = s.match(/^#{1,2}\s+(.+)$/m);
    return { title: titleMatch?.[1] ?? "", content: s };
  });
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Sin tarjeta en Voyage el rate limit es 3 req/min — reintenta con espera.
async function embedWithRetry(texts: string[], attempt = 1): Promise<number[][]> {
  try {
    return await embed(texts);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    if (message.includes("429") && attempt <= 5) {
      const waitMs = 22_000;
      console.log(`  … rate limit, esperando ${waitMs / 1000}s (intento ${attempt}/5)`);
      await sleep(waitMs);
      return embedWithRetry(texts, attempt + 1);
    }
    throw err;
  }
}

async function main() {
  const files = fs.readdirSync(DOCS_DIR).filter((f) => f.endsWith(".md"));
  const chunks: { source: string; title: string; content: string; embedding: number[] }[] = [];

  for (const file of files) {
    const raw = fs.readFileSync(path.join(DOCS_DIR, file), "utf-8");
    const sections = chunkContent(raw);
    await sleep(21_000);
    const embeddings = await embedWithRetry(sections.map((s) => s.content));
    sections.forEach((s, i) => {
      chunks.push({ source: file, title: s.title, content: s.content, embedding: embeddings[i] });
    });
    console.log(`✓ ${file} (${sections.length} chunks)`);
  }

  fs.writeFileSync(OUT_PATH, JSON.stringify(chunks));
  console.log(`\nWrote ${chunks.length} chunks to ${OUT_PATH}`);
}

main().then(() => process.exit(0));
