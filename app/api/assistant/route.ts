import { NextRequest, NextResponse } from "next/server";
import { embed } from "@/lib/embeddings";
import { retrieve } from "@/lib/assistant";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = process.env.GROQ_MODEL ?? "openai/gpt-oss-20b";

export async function POST(req: NextRequest) {
  const { question } = await req.json();
  if (!question || typeof question !== "string") {
    return NextResponse.json({ error: "Missing 'question'" }, { status: 400 });
  }

  const groqKey = process.env.GROQ_API_KEY;
  if (!groqKey) {
    return NextResponse.json(
      { error: "Missing GROQ_API_KEY in the environment" },
      { status: 500 }
    );
  }

  const [queryEmbedding] = await embed([question]);
  const matches = retrieve(queryEmbedding, 4);

  const context = matches
    .map((m) => `Source: ${m.source}\n${m.content}`)
    .join("\n\n---\n\n");

  const completion = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${groqKey}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are the Janus assistant, answering questions about the Janus internal developer platform using only the provided doc excerpts. Be concise (2-4 sentences). If the excerpts don't answer the question, say so plainly instead of guessing.",
        },
        {
          role: "user",
          content: `Docs:\n\n${context}\n\nQuestion: ${question}`,
        },
      ],
      temperature: 0.3,
    }),
  });

  if (!completion.ok) {
    const text = await completion.text();
    return NextResponse.json({ error: `Groq error: ${text}` }, { status: 500 });
  }

  const data = await completion.json();
  const answer: string = data.choices?.[0]?.message?.content ?? "";

  return NextResponse.json({
    answer,
    sources: matches.map((m) => ({ source: m.source, title: m.title, score: m.score })),
  });
}
