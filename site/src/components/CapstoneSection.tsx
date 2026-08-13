import { chatStages } from '../data/phases';
import { useReveal } from '../hooks/useReveal';

export default function CapstoneSection() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="projects" className="border-y border-white/10 bg-slate-900/40 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
          <div ref={ref}>
            <span className="text-sm font-bold uppercase tracking-[.2em] text-cyan-400">Capstone evolution</span>
            <h2 className="mt-2 text-3xl font-black text-white">Grow one TCP chat app across the roadmap.</h2>
            <p className="mt-4 leading-7 text-slate-400">
              Instead of discarding every project, keep upgrading one chat application. It becomes a visible record
              of your growth from blocking sockets to an async, tested, observable terminal application.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {chatStages.map(([id, title, desc]) => (
              <div key={id} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                <div className="flex gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-cyan-400/10 font-mono text-xs font-bold text-cyan-300">
                    {id}
                  </span>
                  <div>
                    <h3 className="font-bold text-white">{title}</h3>
                    <p className="mt-1 text-sm leading-5 text-slate-400">{desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
