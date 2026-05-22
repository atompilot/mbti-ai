import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { GROUP_BG, GROUP_COLOR, getPersonality } from "@/lib/agents/personalities";
import { MBTI_TYPES } from "@/lib/mbti/types";
import { cn } from "@/lib/utils";
import { ChatPanel } from "@/components/chat/ChatPanel";

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

      <ChatPanel type={p.code} greeting={p.sampleQuotes[0]} />
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
