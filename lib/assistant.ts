import docsIndex from "./docs-index.json";

export type DocChunk = {
  source: string;
  title: string;
  content: string;
  embedding: number[];
};

function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0,
    normA = 0,
    normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

export function retrieve(queryEmbedding: number[], topK = 4): (DocChunk & { score: number })[] {
  const chunks = docsIndex as DocChunk[];
  return chunks
    .map((c) => ({ ...c, score: cosineSimilarity(queryEmbedding, c.embedding) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}
