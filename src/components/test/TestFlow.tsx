"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { QUICK_QUESTIONS } from "@/lib/mbti/questions";
import { scoreTest } from "@/lib/mbti/scoring";
import type { LikertValue } from "@/lib/mbti/types";
import { LikertScale } from "./LikertScale";

const STORAGE_KEY = "mbti-ai:last-result";

export function TestFlow() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, LikertValue>>({});
  const [index, setIndex] = useState(0);

  const total = QUICK_QUESTIONS.length;
  const current = QUICK_QUESTIONS[index];
  const currentAnswer = answers[current.id];
  const progress = useMemo(
    () => Math.round(((index + (currentAnswer ? 1 : 0)) / total) * 100),
    [index, currentAnswer, total],
  );

  const isLast = index === total - 1;
  const canGoNext = currentAnswer !== undefined;

  function pickAnswer(value: LikertValue) {
    setAnswers((prev) => ({ ...prev, [current.id]: value }));
    if (!isLast) {
      // auto-advance after a small visual beat
      setTimeout(() => setIndex((i) => Math.min(i + 1, total - 1)), 220);
    }
  }

  function goPrev() {
    setIndex((i) => Math.max(0, i - 1));
  }

  function goNext() {
    if (!isLast) setIndex((i) => i + 1);
  }

  function finish() {
    const result = scoreTest(QUICK_QUESTIONS, answers);
    if (typeof window !== "undefined") {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(result));
    }
    router.push("/result");
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-zinc-500">
          <span>
            Question {index + 1} / {total}
          </span>
          <span>{progress}%</span>
        </div>
        <Progress value={progress} />
      </div>

      <Card>
        <CardContent className="p-8 space-y-8">
          <div className="text-center space-y-1">
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              {current.dimension}
            </p>
            <h2 className="text-2xl font-medium leading-snug">
              {current.text.zh}
            </h2>
            <p className="text-sm text-zinc-500">{current.text.en}</p>
          </div>

          <LikertScale value={currentAnswer} onChange={pickAnswer} lang="zh" />
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={goPrev} disabled={index === 0}>
          Previous
        </Button>
        {isLast ? (
          <Button
            onClick={finish}
            disabled={Object.keys(answers).length !== total}
          >
            See my result
          </Button>
        ) : (
          <Button variant="outline" onClick={goNext} disabled={!canGoNext}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
}

export { STORAGE_KEY };
