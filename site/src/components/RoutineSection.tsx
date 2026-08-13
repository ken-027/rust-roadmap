import { routines } from '../data/phases';

export default function RoutineSection() {
  return (
    <section id="routine" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <div className="glass rounded-3xl p-6 sm:p-10">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <span className="text-sm font-bold uppercase tracking-[.2em] text-orange-400">Weekly loop</span>
            <h2 className="mt-2 text-3xl font-black text-white">A routine that builds real fluency</h2>
            <div className="mt-6 space-y-4">
              {routines.map(([id, title, desc]) => (
                <div key={id} className="flex gap-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-orange-500/10 font-bold text-orange-300">
                    {id}
                  </span>
                  <div>
                    <h3 className="font-bold text-white">{title}</h3>
                    <p className="mt-1 text-sm text-slate-400">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-slate-950 p-5 font-mono text-sm shadow-inner">
            <div className="mb-4 flex gap-2">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-amber-400" />
              <span className="h-3 w-3 rounded-full bg-green-400" />
            </div>
            <p className="text-slate-500"># Every project must pass this gate</p>
            <p className="mt-3 text-cyan-300">cargo fmt --check</p>
            <p className="text-cyan-300">cargo clippy -- -D warnings</p>
            <p className="text-cyan-300">cargo test</p>
            <p className="text-cyan-300">cargo doc --no-deps</p>
            <p className="mt-5 text-slate-500"># Later phases</p>
            <p className="mt-3 text-orange-300">cargo nextest run</p>
            <p className="text-orange-300">cargo audit</p>
            <p className="text-orange-300">cargo criterion</p>
            <p className="mt-5 text-green-300">✓ explain every ownership decision</p>
            <p className="text-green-300">✓ no unexplained clone()</p>
            <p className="text-green-300">✓ useful errors, not panics</p>
          </div>
        </div>
      </div>
    </section>
  );
}
