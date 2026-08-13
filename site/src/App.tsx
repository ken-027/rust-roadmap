import { useState } from 'react';
import { animate } from 'motion';
import { phases } from './data/phases';
import type { DialogState, Level } from './types';
import { useDiskProgress } from './hooks/useDiskProgress';
import Header from './components/Header';
import Hero from './components/Hero';
import FeatureGrid from './components/FeatureGrid';
import RoadmapSection from './components/RoadmapSection';
import CapstoneSection from './components/CapstoneSection';
import RoutineSection from './components/RoutineSection';
import Footer from './components/Footer';
import DetailDialog from './components/DetailDialog';

export default function App() {
  const { state, ids, doneCount, percent } = useDiskProgress();
  const [activeFilter, setActiveFilter] = useState<'All' | Level>('All');
  const [expandedNums, setExpandedNums] = useState<Set<string>>(() => new Set([phases[0].num]));
  const [dialog, setDialog] = useState<DialogState>(null);

  function toggleExpanded(num: string) {
    setExpandedNums((prev) => {
      const next = new Set(prev);
      if (next.has(num)) next.delete(num);
      else next.add(num);
      return next;
    });
  }

  function continueToNext() {
    const next = ids.find((id) => !state[id]) ?? ids[ids.length - 1];
    const phase = phases.find((p) => p.projects.some((pr) => pr[3] === next));
    if (phase) setExpandedNums((prev) => new Set(prev).add(phase.num));

    requestAnimationFrame(() => {
      const card = document.querySelector<HTMLElement>(`[data-id="${next}"]`);
      if (!card) return;
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => {
        animate(
          card,
          { boxShadow: ['0 0 0 0 rgba(249,115,22,0)', '0 0 0 6px rgba(249,115,22,.22)', '0 0 0 0 rgba(249,115,22,0)'] },
          { duration: 0.9 },
        );
      }, 500);
    });
  }

  return (
    <div className="min-h-screen selection:bg-orange-500/30">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-10rem] top-[-10rem] h-[28rem] w-[28rem] rounded-full bg-orange-600/10 blur-3xl" />
        <div className="absolute right-[-12rem] top-[20rem] h-[32rem] w-[32rem] rounded-full bg-cyan-500/5 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.7) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.7) 1px,transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <Header />

      <main id="top">
        <Hero percent={percent} doneCount={doneCount} projectCount={ids.length} onContinue={continueToNext} />
        <FeatureGrid />
        <RoadmapSection
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          expandedNums={expandedNums}
          onToggle={toggleExpanded}
          state={state}
          onOpenConcept={(name) => setDialog({ type: 'concept', name })}
          onOpenGuide={(dir) => setDialog({ type: 'guide', dir })}
        />
        <CapstoneSection />
        <RoutineSection />
      </main>

      <Footer />

      <DetailDialog dialog={dialog} state={state} onNavigate={setDialog} />
    </div>
  );
}
