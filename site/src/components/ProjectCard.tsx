import type { Project } from '../types';

interface Props {
  project: Project;
  checked: boolean;
  onOpenGuide: (dir: string) => void;
}

export default function ProjectCard({ project, checked, onOpenGuide }: Props) {
  const [title, description, concepts, dir] = project;

  return (
    <div
      data-id={dir}
      className={`project-card rounded-xl border ${checked ? 'border-green-400/30 bg-green-400/5' : 'border-white/10 bg-slate-950/50'} p-4 transition hover:-translate-y-0.5 hover:border-orange-400/30`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md border ${checked ? 'border-green-400 bg-green-400 text-slate-950' : 'border-slate-600 text-transparent'}`}
          title={checked ? 'Found on disk' : `Create cli-apps/${dir} to complete`}
          aria-label={`${title} ${checked ? 'completed' : 'not started'}`}
        >
          ✓
        </span>
        <div className="min-w-0 flex-1">
          <h5 className="font-bold text-white">{title}</h5>
          <p className="mt-1 text-sm leading-5 text-slate-400">{description}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <span
          className={`truncate font-mono text-[11px] ${checked ? 'text-orange-300' : 'text-slate-500'}`}
          title={checked ? '' : `Tracked from cli-apps/${dir}`}
        >
          {checked ? concepts : `cli-apps/${dir}`}
        </span>
        <button
          onClick={() => onOpenGuide(dir)}
          className="details shrink-0 text-xs font-bold text-cyan-300 hover:text-cyan-200"
        >
          Guide →
        </button>
      </div>
    </div>
  );
}
