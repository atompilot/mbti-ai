import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GROUP_COLOR, PERSONALITIES } from "@/lib/agents/personalities";
import { MBTI_TYPES } from "@/lib/mbti/types";

export default function ChatIndexPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16 space-y-8">
      <div className="space-y-3">
        <Badge variant="outline">Week 2 · UI scaffolded · LLM pending</Badge>
        <h1 className="text-4xl font-semibold tracking-tight">Chat with a type</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Pick a personality to start a conversation. Each type uses a dedicated
          system prompt plus a curated few-shot library.
        </p>
      </div>

      <div className="grid gap-3 grid-cols-2 sm:grid-cols-4">
        {MBTI_TYPES.map((code) => {
          const p = PERSONALITIES[code];
          return (
            <Link
              key={code}
              href={`/chat/${code.toLowerCase()}`}
              className="group"
            >
              <Card className="transition group-hover:border-zinc-900 dark:group-hover:border-zinc-50 h-full">
                <CardHeader>
                  <CardTitle className="font-mono">{code}</CardTitle>
                  <CardDescription>
                    <span className={GROUP_COLOR[p.group]}>{p.group}</span> ·{" "}
                    {p.nickname}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
