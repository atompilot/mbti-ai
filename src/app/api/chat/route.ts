import { NextRequest } from "next/server";
import { getPersonality } from "@/lib/agents/personalities";
import { buildMessages } from "@/lib/agents/buildPrompt";
import { streamChat, type ChatMessage } from "@/lib/llm/doubao";

export const runtime = "nodejs";

interface RequestBody {
  type: string;
  messages: ChatMessage[];
}

export async function POST(req: NextRequest) {
  let body: RequestBody;
  try {
    body = (await req.json()) as RequestBody;
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const personality = getPersonality(body.type);
  if (!personality) {
    return new Response(`Unknown MBTI type: ${body.type}`, { status: 404 });
  }

  if (!Array.isArray(body.messages) || body.messages.length === 0) {
    return new Response("messages must be a non-empty array", { status: 400 });
  }

  const messages = buildMessages(personality, body.messages);

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const delta of streamChat(messages)) {
          controller.enqueue(encoder.encode(delta));
        }
        controller.close();
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        controller.enqueue(encoder.encode(`\n\n[error] ${message}`));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "X-Accel-Buffering": "no",
    },
  });
}
