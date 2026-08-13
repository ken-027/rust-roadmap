import { conceptDetails } from '../data/conceptDetails';

interface Props {
  concepts: string[];
  onOpen: (name: string) => void;
  columns?: 1 | 2;
}

export default function ConceptList({ concepts, onOpen, columns = 2 }: Props) {
  return (
    <div className={`grid gap-3 ${columns === 2 ? 'sm:grid-cols-2' : ''}`}>
      {concepts.map((c, i) => (
        <button
          key={c}
          onClick={() => onOpen(c)}
          className="group flex items-start gap-3 rounded-xl border border-white/10 bg-slate-950/50 p-3 text-left transition hover:-translate-y-0.5 hover:border-cyan-400/30"
        >
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-cyan-400/10 text-xs font-bold text-cyan-300">
            {i + 1}
          </span>
          <span className="min-w-0">
            <span className="flex items-center gap-1.5 font-bold text-white">
              {c}
              <span className="text-cyan-400 opacity-0 transition group-hover:opacity-100">↗</span>
            </span>
            {conceptDetails[c] && (
              <span className="mt-1 block line-clamp-2 text-xs leading-5 text-slate-400">
                {conceptDetails[c][0]}
              </span>
            )}
          </span>
        </button>
      ))}
    </div>
  );
}
