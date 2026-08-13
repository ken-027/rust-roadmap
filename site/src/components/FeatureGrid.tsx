const FEATURES = [
  ['🧠', 'Understand', 'Learn each concept through familiar JS/TS comparisons.'],
  ['⌨️', 'Implement', 'Write the feature yourself before viewing alternatives.'],
  ['🧪', 'Prove', 'Add unit, integration, property, and benchmark tests.'],
  ['🔁', 'Refactor', 'Revisit earlier apps using newly learned Rust patterns.'],
] as const;

export default function FeatureGrid() {
  return (
    <section className="border-y border-white/10 bg-slate-900/40">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        {FEATURES.map(([icon, title, desc]) => (
          <div key={title} className="rounded-2xl p-4">
            <span className="text-2xl">{icon}</span>
            <h3 className="mt-2 font-bold text-white">{title}</h3>
            <p className="mt-1 text-sm text-slate-400">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
