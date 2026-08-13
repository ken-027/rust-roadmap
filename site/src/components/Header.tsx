export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a href="#top" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-orange-500 font-black text-slate-950 shadow-lg shadow-orange-500/20">
            <img src="/rust.svg" alt="" />
          </span>
          <span>
            <strong className="block text-sm text-white">Rust CLI Mastery</strong>
            <span className="text-xs text-slate-400">for JS / TS developers</span>
          </span>
        </a>
        <div className="hidden items-center gap-5 text-sm text-slate-400 md:flex">
          <a className="hover:text-white" href="#roadmap">Roadmap</a>
          <a className="hover:text-white" href="#projects">Capstone</a>
          <a className="hover:text-white" href="#routine">Routine</a>
        </div>
        <span
          className="hidden rounded-lg border border-white/10 px-3 py-2 font-mono text-xs text-slate-400 sm:block"
          title="Progress is detected from cli-apps/<level>/<project> folders. Run the scanner, then refresh."
        >
          tracked from <span className="text-orange-300">cli-apps/</span>
        </span>
      </nav>
    </header>
  );
}
