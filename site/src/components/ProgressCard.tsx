import { useReveal } from '../hooks/useReveal';

interface Props {
  percent: number;
  doneCount: number;
  projectCount: number;
}

export default function ProgressCard({ percent, doneCount, projectCount }: Props) {
  const ref = useReveal<HTMLElement>();

  return (
    <aside ref={ref} className="glass rounded-3xl p-6 shadow-2xl shadow-black/30">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-white">Your progress</h2>
        <span className="font-mono text-sm text-orange-300">{percent}%</span>
      </div>
      <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-orange-600 to-amber-300 transition-[width] duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="mt-5 grid grid-cols-3 gap-3 text-center">
        <div className="rounded-xl bg-white/5 p-3">
          <strong className="block text-xl text-white">{doneCount}</strong>
          <span className="text-xs text-slate-500">Completed</span>
        </div>
        <div className="rounded-xl bg-white/5 p-3">
          <strong className="block text-xl text-white">{projectCount}</strong>
          <span className="text-xs text-slate-500">Projects</span>
        </div>
        <div className="rounded-xl bg-white/5 p-3">
          <strong className="block text-xl text-white">8</strong>
          <span className="text-xs text-slate-500">Phases</span>
        </div>
      </div>
      <div className="mt-6 rounded-2xl border border-cyan-400/10 bg-cyan-400/5 p-4">
        <p className="text-xs font-bold uppercase tracking-wider text-cyan-300">Core mental shift</p>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          <code className="text-cyan-200">const user = {'{...}'}</code> is easy to share in JS. Rust asks:{' '}
          <em>who owns it, who may borrow it, and how long is that reference valid?</em>
        </p>
      </div>
    </aside>
  );
}
