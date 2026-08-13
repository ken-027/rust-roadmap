import { useMemo } from 'react';
import { phases } from '../data/phases';

declare global {
  interface Window {
    diskProgress?: Record<string, boolean>;
  }
}

const EMPTY: Record<string, boolean> = {};

export function useDiskProgress() {
  const state = window.diskProgress ?? EMPTY;
  const ids = useMemo(() => phases.flatMap((p) => p.projects.map((pr) => pr[3])), []);
  const doneIds = useMemo(() => ids.filter((id) => state[id]), [ids, state]);
  const percent = ids.length ? Math.round((doneIds.length / ids.length) * 100) : 0;

  return { state, ids, doneCount: doneIds.length, percent };
}
