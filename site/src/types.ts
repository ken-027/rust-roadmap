export type Level = 'Basic' | 'Intermediate' | 'Advanced' | 'Expert';

export type Project = [title: string, description: string, concepts: string, dir: string];

export interface Phase {
  level: Level;
  num: string;
  title: string;
  weeks: string;
  summary: string;
  concepts: string[];
  js: string;
  projects: Project[];
  exit: string[];
}

export type ChatStage = [id: string, title: string, description: string];

export type RoutineStep = [id: string, title: string, description: string];

export type DialogState = { type: 'concept'; name: string; from?: DialogState } | { type: 'guide'; dir: string } | null;

export type ConceptDetail = [
  description: string,
  ts: string,
  rust: string,
  difference: string,
  link1: string,
  link2: string | null,
];
