import { phases } from '../data/phases';
import type { Level } from '../types';
import PhaseCard from './PhaseCard';

const LEVELS: ('All' | Level)[] = ['All', 'Basic', 'Intermediate', 'Advanced', 'Expert'];

interface Props {
  activeFilter: 'All' | Level;
  onFilterChange: (level: 'All' | Level) => void;
  expandedNums: Set<string>;
  onToggle: (num: string) => void;
  state: Record<string, boolean>;
  onOpenConcept: (name: string) => void;
  onOpenGuide: (dir: string) => void;
}

export default function RoadmapSection({
  activeFilter,
  onFilterChange,
  expandedNums,
  onToggle,
  state,
  onOpenConcept,
  onOpenGuide,
}: Props) {
  const visible = phases.filter((p) => activeFilter === 'All' || p.level === activeFilter);

  return (
    <section id="roadmap" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="text-sm font-bold uppercase tracking-[.2em] text-orange-400">Eight phases</span>
          <h2 className="mt-2 text-3xl font-black text-white sm:text-4xl">Interactive learning roadmap</h2>
          <p className="mt-3 max-w-2xl text-slate-400">
            Open a phase, click any concept for a TypeScript comparison and runnable Rust example, then complete its
            project checkpoints.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {LEVELS.map((level) => (
            <button
              key={level}
              onClick={() => onFilterChange(level)}
              className={`filter rounded-full border px-3 py-1.5 text-xs font-bold transition ${
                activeFilter === level
                  ? 'border-orange-400 bg-orange-400/15 text-orange-300'
                  : 'border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 space-y-5">
        {visible.map((phase) => (
          <PhaseCard
            key={phase.num}
            phase={phase}
            isOpen={expandedNums.has(phase.num)}
            onToggle={onToggle}
            state={state}
            onOpenConcept={onOpenConcept}
            onOpenGuide={onOpenGuide}
          />
        ))}
      </div>
    </section>
  );
}
