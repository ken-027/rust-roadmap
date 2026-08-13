export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-4 py-10 text-center text-sm text-slate-500">
      Built as a local-first roadmap. Progress is detected from <code>cli-apps/&lt;level&gt;/&lt;project&gt;</code>{' '}
      folders — run the progress scanner (<code>cargo run</code> in <code>cli-apps/tools/progress-scanner</code>),
      then refresh.
    </footer>
  );
}
