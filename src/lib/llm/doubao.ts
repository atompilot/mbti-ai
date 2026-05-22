import OpenAI from "openai";

const DEFAULT_BASE_URL = "https://ark.cn-beijing.volces.com/api/v3";
const DEFAULT_MODEL = "doubao-seed-2-0-pro-260215";

let cached: OpenAI | null = null;

function getClient(): OpenAI {
  if (cached) return cached;
  const apiKey = process.env.LLM_API_KEY;
  if (!apiKey) {
    throw new Error(
      "LLM_API_KEY is not set. Copy .env.example to .env.local and fill it in.",
    );
  }
  cached = new OpenAI({
    apiKey,
    baseURL: process.env.LLM_BASE_URL || DEFAULT_BASE_URL,
  });
  return cached;
}

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

/**
 * Streams chat completion deltas. Yields token strings as they arrive.
 */
export async function* streamChat(
  messages: ChatMessage[],
  options: { temperature?: number } = {},
): AsyncGenerator<string> {
  const client = getClient();
  const model = process.env.LLM_MODEL || DEFAULT_MODEL;

  const stream = await client.chat.completions.create({
    model,
    messages,
    stream: true,
    temperature: options.temperature ?? 0.9,
  });

  for await (const chunk of stream) {
    const delta = chunk.choices[0]?.delta?.content;
    if (delta) yield delta;
  }
}
