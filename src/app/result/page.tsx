"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { DIMENSIONS, type TestResult } from "@/lib/mbti/types";
import { cn } from "@/lib/utils";
import { SpectrumRadar } from "@/components/result/SpectrumRadar";

const STORAGE_KEY = "mbti-ai:last-result";

export default function ResultPage() {
  const [result, setResult] = useState<TestResult | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    if (typeof window === "undefined") return;
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) setResult(JSON.parse(raw) as TestResult);
  }, []);

  if (!hydrated) {
    return <main className="mx-auto max-w-2xl px-6 py-16" />;
  }

  if (!result) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-16 text-center space-y-4">
        <h1 className="text-3xl font-semibold">No result found</h1>
        <p className="text-zinc-500">Take the test to see your spectrum.</p>
        <Link href="/test" className={cn(buttonVariants())}>
          Start Test
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-12 space-y-8">
      <div className="text-center space-y-2">
        <Badge variant="outline">Your result</Badge>
        <h1 className="text-6xl font-mono font-semibold tracking-tight">
          {result.type}
        </h1>
        <p className="text-sm text-zinc-500">
          Based on {result.answeredCount} answers
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <SpectrumRadar scores={result.scores} type={result.type} />
        </CardContent>
      </Card>

      <Separator />

      <div className="space-y-4">
        <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-500">
          Per-dimension breakdown
        </h2>
        {DIMENSIONS.map((dim) => {
          const s = result.scores[dim.code];
          return (
            <Card key={dim.code}>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-zinc-500">
                  {dim.label}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-baseline justify-between text-sm">
                  <span className="font-mono">
                    {dim.left}{" "}
                    <span className="text-zinc-500">{s.percentageLeft}%</span>
                  </span>
                  <span className="font-mono">
                    <span className="text-zinc-500">{s.percentageRight}%</span>{" "}
                    {dim.right}
                  </span>
                </div>
                <Progress value={s.percentageRight} />
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-3 pt-4">
        <Link
          href={`/chat/${result.type.toLowerCase()}`}
          className={cn(buttonVariants())}
        >
          Chat with {result.type}
        </Link>
        <Link href="/test" className={cn(buttonVariants({ variant: "outline" }))}>
          Retake
        </Link>
      </div>
    </main>
  );
}
