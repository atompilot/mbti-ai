export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200/60 py-6 text-center text-xs text-zinc-500 dark:border-zinc-800/60">
      <div className="mx-auto max-w-6xl px-6">
        © {new Date().getFullYear()} mbti-ai · MIT · For self-exploration, not clinical use.
      </div>
    </footer>
  );
}
