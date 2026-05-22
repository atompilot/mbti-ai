"use client";

import { LIKERT_LABELS, type LikertValue } from "@/lib/mbti/types";
import { cn } from "@/lib/utils";

interface LikertScaleProps {
  value?: LikertValue;
  onChange: (value: LikertValue) => void;
  lang?: "en" | "zh";
}

const VALUES: LikertValue[] = [1, 2, 3, 4, 5, 6, 7];

/**
 * Symmetric 7-point Likert scale.
 * Larger buttons on the extremes, smaller in the middle — visually conveys magnitude.
 */
export function LikertScale({ value, onChange, lang = "zh" }: LikertScaleProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs text-zinc-500">
        <span>{LIKERT_LABELS[1][lang]}</span>
        <span>{LIKERT_LABELS[4][lang]}</span>
        <span>{LIKERT_LABELS[7][lang]}</span>
      </div>
      <div className="flex items-center justify-between gap-2">
        {VALUES.map((v) => {
          const distance = Math.abs(v - 4);
          const size = ["size-7", "size-9", "size-11", "size-12"][distance];
          const selected = value === v;
          return (
            <button
              key={v}
              type="button"
              onClick={() => onChange(v)}
              aria-label={LIKERT_LABELS[v][lang]}
              aria-pressed={selected}
              className={cn(
                "rounded-full border-2 transition flex items-center justify-center text-xs font-medium",
                size,
                v < 4 && "border-rose-400 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950",
                v === 4 && "border-zinc-400 text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-900",
                v > 4 && "border-emerald-400 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950",
                selected && v < 4 && "bg-rose-500 text-white border-rose-500 hover:bg-rose-500",
                selected && v === 4 && "bg-zinc-500 text-white border-zinc-500 hover:bg-zinc-500",
                selected && v > 4 && "bg-emerald-500 text-white border-emerald-500 hover:bg-emerald-500",
              )}
            >
              {v}
            </button>
          );
        })}
      </div>
    </div>
  );
}
