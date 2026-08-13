import { useEffect, useRef } from 'react';
import Prism from 'prismjs';
import type { DialogState } from '../types';
import { conceptDetails } from '../data/conceptDetails';
import { phases } from '../data/phases';
import ConceptList from './ConceptList';

interface Props {
  dialog: DialogState;
  state: Record<string, boolean>;
  onNavigate: (next: DialogState) => void;
}

const REPO_TREE_URL = 'https://github.com/ken-027/rust-roadmap/tree/main/cli-apps';

const GUIDE_STEPS = [
  'Define command syntax and examples before coding',
  'Create the smallest working vertical slice',
  'Model invalid states with enums and typed errors',
  'Add tests for normal, boundary, and failure cases',
  'Run fmt, clippy, and test; then write a short README',
];

function highlight(code: string, lang: 'typescript' | 'rust') {
  const grammar = Prism.languages[lang];
  return grammar ? Prism.highlight(code, grammar, lang) : code;
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

export default function DetailDialog({ dialog, state, onNavigate }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const close = () => onNavigate(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (dialog) {
      if (!d.open) d.showModal();
    } else if (d.open) {
      d.close();
    }
  }, [dialog]);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    const handleClose = () => onNavigate(null);
    d.addEventListener('close', handleClose);
    return () => d.removeEventListener('close', handleClose);
  }, [onNavigate]);

  return (
    <dialog
      ref={ref}
      className="m-auto max-h-[90vh] w-[min(720px,calc(100%-2rem))] overflow-y-auto rounded-3xl border border-white/10 bg-slate-900 p-0 text-slate-200 shadow-2xl backdrop:bg-black/70"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      {dialog?.type === 'concept' && (
        <ConceptContent
          name={dialog.name}
          onClose={close}
          onBack={dialog.from ? () => onNavigate(dialog.from!) : undefined}
        />
      )}
      {dialog?.type === 'guide' && (
        <GuideContent
          dir={dialog.dir}
          done={!!state[dialog.dir]}
          onClose={close}
          onOpenConcept={(name) => onNavigate({ type: 'concept', name, from: dialog })}
        />
      )}
    </dialog>
  );
}

function ConceptContent({
  name,
  onClose,
  onBack,
}: {
  name: string;
  onClose: () => void;
  onBack?: () => void;
}) {
  const item = conceptDetails[name];
  if (!item) return null;
  const [description, ts, rust, difference, link1, link2] = item;
  const resources = [link1, link2].filter((x): x is string => !!x);

  return (
    <div>
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-slate-900/95 p-5 backdrop-blur">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Concept comparison</span>
          <h3 className="text-xl font-black text-white">{name}</h3>
        </div>
        <button onClick={onBack ?? onClose} className="rounded-lg border border-white/10 px-3 py-2 text-sm">
          {onBack ? '← Back' : 'Close'}
        </button>
      </div>
      <div className="p-5 sm:p-7">
        <p className="leading-7 text-slate-300">{description}</p>
        <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
          <section className="sample-shell sample-shell-ts">
            <div className="sample-header sample-header-ts">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[.18em] text-blue-300">Familiar side</span>
                <h4 className="mt-0.5 font-bold text-blue-100">TypeScript / JavaScript</h4>
              </div>
              <span className="language-badge border-blue-400/25 bg-blue-400/10 text-blue-300">TS / JS</span>
            </div>
            <pre className="code-panel">
              <code
                className="language-typescript"
                dangerouslySetInnerHTML={{ __html: highlight(ts, 'typescript') }}
              />
            </pre>
            <div className="syntax-legend">
              <span><i className="syntax-dot bg-pink-400" />keyword</span>
              <span><i className="syntax-dot bg-blue-400" />function</span>
              <span><i className="syntax-dot bg-violet-300" />type</span>
              <span><i className="syntax-dot bg-green-300" />string</span>
              <span><i className="syntax-dot bg-cyan-300" />operator</span>
            </div>
          </section>
          <div className="comparison-arrow" aria-hidden="true">→</div>
          <section className="sample-shell sample-shell-rust">
            <div className="sample-header sample-header-rust">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[.18em] text-orange-300">
                  Rust translation
                </span>
                <h4 className="mt-0.5 font-bold text-orange-100">Rust</h4>
              </div>
              <span className="language-badge border-orange-400/25 bg-orange-400/10 text-orange-300">.rs</span>
            </div>
            <pre className="code-panel">
              <code className="language-rust" dangerouslySetInnerHTML={{ __html: highlight(rust, 'rust') }} />
            </pre>
            <div className="syntax-legend">
              <span><i className="syntax-dot bg-pink-400" />keyword</span>
              <span><i className="syntax-dot bg-blue-400" />function</span>
              <span><i className="syntax-dot bg-violet-300" />type</span>
              <span><i className="syntax-dot bg-green-300" />string</span>
              <span><i className="syntax-dot bg-amber-400" />macro</span>
            </div>
          </section>
        </div>
        <div className="mt-5 rounded-xl border border-cyan-400/10 bg-cyan-400/5 p-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300">
            What changes in your mental model
          </h4>
          <p className="mt-2 text-sm leading-6 text-slate-300">{difference}</p>
        </div>
        <div className="mt-6">
          <h4 className="font-bold text-white">Learn more</h4>
          <div className="mt-3 flex flex-wrap gap-3">
            {resources.map((url, i) => (
              <a
                key={url}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-orange-400/20 bg-orange-400/10 px-3 py-2 text-sm font-bold text-orange-300 transition hover:bg-orange-400/20"
              >
                {i === 0 ? 'Official guide' : 'Additional reference'} ↗
              </a>
            ))}
          </div>
        </div>
        <div className="mt-6 rounded-xl bg-white/[.03] p-4">
          <p className="text-sm text-slate-400">
            <strong className="text-white">Practice:</strong> copy both examples, change one value or type, predict
            the result, then run the Rust version with <code className="text-cyan-300">cargo run</code>.
          </p>
        </div>
      </div>
    </div>
  );
}

function GuideContent({
  dir,
  done,
  onClose,
  onOpenConcept,
}: {
  dir: string;
  done: boolean;
  onClose: () => void;
  onOpenConcept: (name: string) => void;
}) {
  const phase = phases.find((p) => p.projects.some((pr) => pr[3] === dir));
  const project = phase?.projects.find((pr) => pr[3] === dir);
  if (!phase || !project) return null;
  const [title, description, concepts] = project;

  return (
    <div>
      <div className="sticky top-0 flex items-center justify-between border-b border-white/10 bg-slate-900/95 p-5 backdrop-blur">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-orange-400">Phase {phase.num}</span>
          <h3 className="text-xl font-black text-white">{title}</h3>
        </div>
        <button onClick={onClose} className="rounded-lg border border-white/10 px-3 py-2 text-sm">
          Close
        </button>
      </div>
      <div className="p-5 sm:p-7">
        <p className="leading-7 text-slate-300">{description}</p>
        <div className="mt-5 rounded-xl bg-slate-950 p-4">
          <span className="text-xs text-slate-500">Primary concepts</span>
          <code className="mt-2 block text-sm text-cyan-300">{concepts}</code>
          <span className="mt-3 block text-xs text-slate-500">Marks as complete when this folder exists and its tests pass</span>
          <code className="mt-1 block text-sm text-orange-300">cli-apps/{dir}/</code>
          {done && (
            <a
              href={`${REPO_TREE_URL}/${dir}`}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-green-300 hover:text-green-200"
            >
              <GitHubIcon /> View completed code on GitHub ↗
            </a>
          )}
        </div>
        <h4 className="mt-7 font-bold text-white">Concept lessons for this phase</h4>
        <div className="mt-3">
          <ConceptList concepts={phase.concepts} onOpen={onOpenConcept} />
        </div>
        <h4 className="mt-7 font-bold text-white">Implementation checkpoints</h4>
        <ol className="mt-3 space-y-3">
          {GUIDE_STEPS.map((s, i) => (
            <li key={s} className="flex gap-3 text-sm text-slate-400">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-orange-500/10 text-xs font-bold text-orange-300">
                {i + 1}
              </span>
              {s}
            </li>
          ))}
        </ol>
        <h4 className="mt-7 font-bold text-white">Do not move on until</h4>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          You can explain where every owned value moves, why every reference stays valid, and how errors reach the
          CLI user.
        </p>
      </div>
    </div>
  );
}
