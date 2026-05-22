export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-24 bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-black">
      <div className="max-w-2xl text-center space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/60 px-3 py-1 text-xs text-zinc-600 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400">
          <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
          Work in Progress · Week 1
        </div>

        <h1 className="text-5xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl">
          mbti-ai
        </h1>

        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Take an MBTI test, then chat with an AI that actually thinks like that type.
        </p>

        <div className="flex items-center justify-center gap-3 pt-4">
          <button
            disabled
            className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white opacity-50 dark:bg-zinc-50 dark:text-zinc-900"
          >
            Start Test (coming soon)
          </button>
          <a
            href="https://github.com/atompilot/mbti-ai"
            className="rounded-full border border-zinc-200 px-5 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900"
          >
            GitHub
          </a>
        </div>
      </div>
    </main>
  );
}
