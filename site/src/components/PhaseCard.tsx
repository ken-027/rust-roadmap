import type { Phase } from '../types';
import { useReveal } from '../hooks/useReveal';
import ConceptList from './ConceptList';
import ProjectCard from './ProjectCard';

interface Props {
  phase: Phase;
  isOpen: boolean;
  onToggle: (num: string) => void;
  state: Record<string, boolean>;
  onOpenConcept: (name: string) => void;
  onOpenGuide: (dir: string) => void;
}

export default function PhaseCard({ phase, isOpen, onToggle, state, onOpenConcept, onOpenGuide }: Props) {
  const ref = useReveal<HTMLElement>();
  const complete = phase.projects.filter((pr) => state[pr[3]]).length;

  return (
    <article ref={ref} className="phase glass overflow-hidden rounded-2xl" data-level={phase.level}>
      <button
        className="phase-toggle flex w-full items-center gap-4 p-5 text-left sm:p-6"
        aria-expanded={isOpen}
        onClick={() => onToggle(phase.num)}
      >
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-orange-500/10 font-mono font-bold text-orange-300">
          {phase.num}
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-2">
            <strong className="text-lg text-white sm:text-xl">{phase.title}</strong>
            <em className="rounded-full bg-white/5 px-2 py-1 text-[10px] not-italic uppercase tracking-wider text-slate-400">
              {phase.level}
            </em>
          </span>
          <span className="mt-1 block text-sm text-slate-400">{phase.summary}</span>
        </span>
        <span className="hidden text-right sm:block">
          <strong className="block text-sm text-white">
            {complete}/{phase.projects.length}
          </strong>
          <span className="text-xs text-slate-500">{phase.weeks}</span>
        </span>
        <span className="chevron text-xl text-slate-500">{isOpen ? '⌃' : '⌄'}</span>
      </button>

      <div className={`phase-body ${isOpen ? '' : 'hidden'} border-t border-white/10 p-5 sm:p-6`}>
        <div className="rounded-xl border border-cyan-400/10 bg-cyan-400/5 p-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300">JavaScript → Rust bridge</h4>
          <p className="mt-2 text-sm leading-6 text-slate-300">{phase.js}</p>
        </div>

        <div className="mt-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Concepts</h4>
          <div className="mt-3">
            <ConceptList concepts={phase.concepts} onOpen={onOpenConcept} />
          </div>
        </div>

        <div className="mt-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Projects ({complete}/{phase.projects.length})
          </h4>
          <div className="mt-3 grid gap-3 lg:grid-cols-2 xl:grid-cols-3">
            {phase.projects.map((pr) => (
              <ProjectCard key={pr[3]} project={pr} checked={!!state[pr[3]]} onOpenGuide={onOpenGuide} />
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-xl bg-white/[.03] p-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Exit criteria</h4>
          <ul className="mt-3 grid gap-2 sm:grid-cols-3">
            {phase.exit.map((x) => (
              <li key={x} className="flex gap-2 text-sm text-slate-400">
                <span className="text-green-400">✓</span>
                {x}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
