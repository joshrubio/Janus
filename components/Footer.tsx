export default function Footer() {
  return (
    <footer className="shrink-0 border-t px-5 py-3 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
      <p>
        <span className="font-serif italic">Janus</span> — a self-service developer platform, in
        miniature.
      </p>
      <a
        href="https://github.com/joshrubio/Janus"
        target="_blank"
        rel="noreferrer"
        className="hover:text-foreground transition-colors"
      >
        Source
      </a>
    </footer>
  );
}
