import { Badge } from "@/components/ui/badge";
import { TestFlow } from "@/components/test/TestFlow";

export default function TestPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-12 space-y-6">
      <div className="space-y-2 text-center">
        <Badge variant="outline">Quick Test · 28 questions · ~5 min</Badge>
        <h1 className="text-3xl font-semibold tracking-tight">MBTI Quick Test</h1>
        <p className="text-sm text-zinc-500">
          7-point scale. Pick the option that best describes you.
        </p>
      </div>
      <TestFlow />
    </main>
  );
}
