import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  GROUP_BG,
  GROUP_COLOR,
  PERSONALITIES,
  getPersonality,
} from "@/lib/agents/personalities";
import { MBTI_TYPES } from "@/lib/mbti/types";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return MBTI_TYPES.map((code) => ({ code: code.toLowerCase() }));
}

export default async function TypeDetailPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const p = getPersonality(code);
  if (!p) notFound();

  return (
    <main className="mx-auto max-w-3xl px-6 py-12 space-y-8">
      <div className="space-y-3">
        <Link href="/types" className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50">
          ← All types
        </Link>
        <div className={cn("rounded-2xl p-8 space-y-2", GROUP_BG[p.group])}>
          <Badge variant="outline" className={GROUP_COLOR[p.group]}>
            {p.group}
          </Badge>
          <h1 className="text-5xl font-mono font-semibold tracking-tight">
            {p.code}
          </h1>
          <p className="text-xl">{p.nickname}</p>
          <p className="text-zinc-700 dark:text-zinc-300 pt-2">{p.oneLiner}</p>
        </div>
      </div>

      <Section title="核心特质">
        <ul className="flex flex-wrap gap-2">
          {p.traits.map((t) => (
            <li key={t}>
              <Badge variant="secondary">{t}</Badge>
            </li>
          ))}
        </ul>
      </Section>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-emerald-600 dark:text-emerald-400">
              Strengths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 text-sm space-y-1 text-zinc-700 dark:text-zinc-300">
              {p.strengths.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-rose-600 dark:text-rose-400">
              Blind spots
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 text-sm space-y-1 text-zinc-700 dark:text-zinc-300">
              {p.blindSpots.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Section title="沟通风格">
        <p className="text-sm text-zinc-700 dark:text-zinc-300">{p.toneStyle}</p>
      </Section>

      <Section title="口头禅样例">
        <ul className="space-y-2">
          {p.sampleQuotes.map((q, i) => (
            <li
              key={i}
              className="rounded-lg border border-zinc-200 px-4 py-2 text-sm italic text-zinc-700 dark:border-zinc-800 dark:text-zinc-300"
            >
              “{q}”
            </li>
          ))}
        </ul>
      </Section>

      <Separator />

      <div className="flex items-center justify-center gap-3 pt-2">
        <Link
          href={`/chat/${p.code.toLowerCase()}`}
          className={cn(buttonVariants())}
        >
          Chat with {p.code}
        </Link>
        <Link href="/types" className={cn(buttonVariants({ variant: "outline" }))}>
          More types
        </Link>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-500">
        {title}
      </h2>
      {children}
    </section>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const p = getPersonality(code);
  if (!p) return { title: "Type not found · mbti-ai" };
  return {
    title: `${p.code} — ${p.nickname} · mbti-ai`,
    description: p.oneLiner,
  };
}

// Keep PERSONALITIES import live for tree-shaking visibility
void PERSONALITIES;
