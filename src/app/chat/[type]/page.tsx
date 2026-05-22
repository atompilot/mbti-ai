import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GROUP_BG, GROUP_COLOR, getPersonality } from "@/lib/agents/personalities";
import { MBTI_TYPES } from "@/lib/mbti/types";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return MBTI_TYPES.map((type) => ({ type: type.toLowerCase() }));
}

export default async function ChatTypePage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  const p = getPersonality(type);
  if (!p) notFound();

  return (
    <main className="mx-auto max-w-3xl px-6 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/chat" className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50">
          ← All types
        </Link>
        <Link href={`/types/${p.code.toLowerCase()}`} className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50">
          About {p.code} →
        </Link>
      </div>

      <div className={cn("rounded-2xl p-6 flex items-center justify-between gap-4", GROUP_BG[p.group])}>
        <div className="space-y-1">
          <Badge variant="outline" className={GROUP_COLOR[p.group]}>
            {p.group}
          </Badge>
          <h1 className="text-3xl font-mono font-semibold tracking-tight">
            {p.code} · {p.nickname}
          </h1>
          <p className="text-sm text-zinc-700 dark:text-zinc-300">{p.oneLiner}</p>
        </div>
      </div>

      <Card className="border-dashed">
        <CardHeader>
          <CardTitle className="text-base">Chat is coming in Week 2</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-zinc-600 dark:text-zinc-400">
          <p>
            The {p.code} agent will use a dedicated system prompt plus a
            curated library of few-shot examples to keep its voice consistent.
          </p>
          <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              Sample voice
            </p>
            <ul className="mt-2 space-y-2">
              {p.sampleQuotes.map((q, i) => (
                <li key={i} className="italic text-zinc-700 dark:text-zinc-300">
                  “{q}”
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800">
        <div className="border-b border-zinc-200 px-4 py-3 text-sm text-zinc-500 dark:border-zinc-800">
          Chat preview (UI only)
        </div>
        <div className="space-y-3 p-4 min-h-[200px]">
          <div className="flex">
            <div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-zinc-100 px-4 py-2 text-sm dark:bg-zinc-900">
              {p.sampleQuotes[0]}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 border-t border-zinc-200 p-3 dark:border-zinc-800">
          <input
            disabled
            placeholder="Chat is not connected yet…"
            className="flex-1 rounded-lg border border-zinc-200 bg-transparent px-3 py-2 text-sm placeholder:text-zinc-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800"
          />
          <button
            disabled
            className={cn(buttonVariants(), "opacity-50 cursor-not-allowed")}
          >
            Send
          </button>
        </div>
      </div>
    </main>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  const p = getPersonality(type);
  if (!p) return { title: "Type not found · mbti-ai" };
  return {
    title: `Chat with ${p.code} — ${p.nickname} · mbti-ai`,
    description: `Talk to an AI agent that thinks like ${p.code}: ${p.oneLiner}`,
  };
}
