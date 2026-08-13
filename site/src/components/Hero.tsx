import { useReveal } from '../hooks/useReveal';
import ProgressCard from './ProgressCard';

interface Props {
  percent: number;
  doneCount: number;
  projectCount: number;
  onContinue: () => void;
}

export default function Hero({ percent, doneCount, projectCount, onContinue }: Props) {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-16 sm:px-6 lg:grid-cols-[1.15fr_.85fr] lg:pt-24">
      <div ref={ref}>
        <span className="inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-400/10 px-3 py-1 text-xs font-bold uppercase tracking-[.2em] text-orange-300">
          Project-first learning path
        </span>
        <h1 className="mt-6 max-w-4xl text-4xl font-black leading-tight text-white sm:text-6xl">
          Go from TypeScript developer to <span className="gradient-text">advanced Rust CLI engineer.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
          Build 25 progressively harder command-line applications while mastering ownership, traits, lifetimes,
          concurrency, async networking, systems programming, macros, testing, and production-grade design.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#roadmap"
            className="rounded-xl bg-orange-500 px-5 py-3 font-bold text-slate-950 shadow-lg shadow-orange-500/20 transition hover:bg-orange-400"
          >
            Start the roadmap
          </a>
          <button
            onClick={onContinue}
            className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-bold text-white transition hover:bg-white/10"
          >
            Continue where I stopped
          </button>
        </div>
        <div className="mt-8 flex flex-wrap gap-2 text-xs text-slate-400">
          <span className="code-chip">cargo</span>
          <span className="code-chip">clap</span>
          <span className="code-chip">serde</span>
          <span className="code-chip">tokio</span>
          <span className="code-chip">tracing</span>
          <span className="code-chip">rayon</span>
          <span className="code-chip">ratatui</span>
        </div>
      </div>

      <ProgressCard percent={percent} doneCount={doneCount} projectCount={projectCount} />
    </section>
  );
}
