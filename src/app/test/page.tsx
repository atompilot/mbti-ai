import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TestPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 space-y-8">
      <div className="space-y-3">
        <Badge variant="outline">Week 1 · in progress</Badge>
        <h1 className="text-4xl font-semibold tracking-tight">MBTI Test</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Two modes will be available: a 28-question quick test and a 93-question full
          version. Both use a 7-point Likert scale and return percentages for each
          dimension.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coming soon</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-zinc-600 dark:text-zinc-400">
          Question bank, scoring engine, and the answer flow land in Week 1 of the
          roadmap.
        </CardContent>
      </Card>
    </main>
  );
}
