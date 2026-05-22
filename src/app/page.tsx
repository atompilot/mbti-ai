import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main className="flex-1">
      <section className="mx-auto max-w-3xl px-6 py-24 text-center space-y-6">
        <Badge variant="outline" className="rounded-full">
          <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-orange-500" />
          Work in Progress · Week 1
        </Badge>

        <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">mbti-ai</h1>

        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Take an MBTI test, then chat with an AI that actually thinks like that type.
        </p>

        <div className="flex items-center justify-center gap-3 pt-2">
          <Link href="/test" className={cn(buttonVariants({ size: "lg" }))}>
            Start Test
          </Link>
          <Link
            href="/types"
            className={cn(buttonVariants({ size: "lg", variant: "outline" }))}
          >
            Browse 16 Types
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24 grid gap-4 sm:grid-cols-3">
        {[
          {
            title: "1. Take the test",
            desc: "93 questions, 7-point Likert scale. Get a 4-dimension spectrum, not just a label.",
          },
          {
            title: "2. Read your spectrum",
            desc: "See your percentage on E↔I · S↔N · T↔F · J↔P. Shareable result page.",
          },
          {
            title: "3. Chat with a type",
            desc: "Pick any of 16 personalities. Powered by prompt + RAG few-shot agents.",
          },
        ].map((card) => (
          <Card key={card.title}>
            <CardHeader>
              <CardTitle className="text-base">{card.title}</CardTitle>
              <CardDescription>{card.desc}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>
    </main>
  );
}
