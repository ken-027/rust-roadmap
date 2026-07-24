# Rust CLI Mastery

Personal roadmap: TypeScript/JavaScript developer → advanced Rust CLI engineer, through 25 progressively harder command-line projects across 8 phases. Interactive tracker lives in `rust-cli-mastery-roadmap.html`; this file is the plain-text reference.

**Live page:** [https://rust-roadmap.kdevtech.com](https://rust-roadmap.kdevtech.com)

## Quick start

```sh
# view the roadmap
open rust-cli-mastery-roadmap.html      # or just double-click it — no build step, no server

# start a project
cargo new cli-apps/basic/calculator

# refresh progress after finishing/starting projects
cd cli-apps/tools/progress-scanner && cargo run
```

## Make commands

Run `make` or `make help` to list the available commands.

```sh
# run the calculator (operator: add, subtract, multiply, divide, or mod)
make calculator operator=add

# refresh roadmap progress
make scan

# test, lint, or check formatting for an app
make test app=calculator
make clippy app=calculator
make fmt app=calculator
```

## How progress tracking works

Progress is derived from disk, not clicks. A project counts as **done** when its folder contains a `Cargo.toml`:

```
cli-apps/<level>/<slug>/Cargo.toml
```

The scanner at `cli-apps/tools/progress-scanner` (a Rust binary — project zero, see below) walks `cli-apps/basic|intermediate|advanced|expert/`, checks each folder, and writes `progress.js` at the repo root:

```js
window.diskProgress = {"basic/calculator": true, ...};
```

The HTML loads that file with `<script src="progress.js">` and renders checkmarks from it. This is a **snapshot**, not a live filesystem watch — rerun the scanner after each project and refresh the page. Details: [`cli-apps/README.md`](cli-apps/README.md).

## The 8 phases

| # | Phase | Level | Time | Projects |
|---|-------|-------|------|----------|
| 01 | Rust Foundations | Basic | 2–3 wks | CLI Calculator, Unit Converter, Password Generator |
| 02 | Idiomatic Data Modeling | Basic | 3 wks | Todo CLI, JSON Formatter, Mini Grep |
| 03 | Filesystem & CLI Design | Intermediate | 2–3 wks | Tree Clone, Disk Usage, Find Clone |
| 04 | Concurrency & Shared State | Intermediate | 3–4 wks | Parallel Copier, Log Analyzer, CSV Processor |
| 05 | Async Rust & Networking | Advanced | 4–5 wks | HTTP Client, Website Monitor, Port Scanner, TCP Chat |
| 06 | Systems Programming | Advanced | 4–5 wks | Mini Shell, Process Manager, File Watcher |
| 07 | Advanced Language Features | Expert | 5–6 wks | Redis Clone, Git Clone, SQLite-Inspired Store |
| 08 | Production Engineering | Expert | 6+ wks | DevOps CLI, Terminal Dashboard, Package & Release |

Each phase page (in the HTML) has concepts with runnable TS↔Rust comparisons, a JS→Rust mental-model bridge, project cards, and exit criteria you should be able to explain before moving on.

## Project checklist

- [x] `basic/calculator` — CLI Calculator
- [ ] `basic/unit-converter` — Unit Converter
- [ ] `basic/password-generator` — Password Generator
- [ ] `basic/todo` — Todo CLI
- [ ] `basic/json-formatter` — JSON Formatter
- [ ] `basic/mini-grep` — Mini Grep
- [ ] `intermediate/tree` — Tree Clone
- [ ] `intermediate/disk-usage` — Disk Usage
- [ ] `intermediate/find` — Find Clone
- [ ] `intermediate/parallel-copier` — Parallel Copier
- [ ] `intermediate/log-analyzer` — Log Analyzer
- [ ] `intermediate/csv-processor` — CSV Processor
- [ ] `advanced/http-client` — HTTP Client
- [ ] `advanced/website-monitor` — Website Monitor
- [ ] `advanced/port-scanner` — Port Scanner
- [ ] `advanced/tcp-chat` — TCP Chat
- [ ] `advanced/mini-shell` — Mini Shell
- [ ] `advanced/process-manager` — Process Manager
- [ ] `advanced/file-watcher` — File Watcher
- [ ] `expert/redis-clone` — Redis Clone
- [ ] `expert/git-clone` — Git Clone
- [ ] `expert/sqlite-store` — SQLite-Inspired Store
- [ ] `expert/devops-cli` — DevOps CLI
- [ ] `expert/terminal-dashboard` — Terminal Dashboard
- [ ] `expert/package-release` — Package & Release

This list is just for reading at a glance — actual done/not-done comes from disk (see above). Checking a box here doesn't do anything; create the folder.

## Folder layout

```
rust-cli-apps/
├── README.md                        this file
├── rust-cli-mastery-roadmap.html    interactive tracker
├── progress.js                      generated — do not hand-edit
├── .gitignore
└── cli-apps/
    ├── README.md                    folder convention + scanner usage
    ├── basic/            <slug>/    phases 01–02
    ├── intermediate/     <slug>/    phases 03–04
    ├── advanced/         <slug>/    phases 05–06
    ├── expert/           <slug>/    phases 07–08
    └── tools/
        └── progress-scanner/        Rust binary that writes progress.js
```

## Capstone: one TCP chat app, evolving

Instead of throwing projects away, phase 05's TCP Chat is meant to be revisited and upgraded as skills grow:

1. Echo server — one client, bytes back
2. Framed messages — newline/length-prefix framing
3. Multi-client broadcast — task per connection, channels
4. Identity and rooms — usernames, join/leave, membership
5. Reliability — bounded queues, timeouts, reconnect, graceful shutdown
6. Production TUI — TLS, tracing, tests, config, Ratatui

## Weekly loop

1. Read narrowly — only what the next checkpoint needs
2. Build from memory — close the tutorial, write a vertical slice
3. Fight the compiler — read the full diagnostic, don't clone just to silence it
4. Test behavior — happy path, boundary, malformed input, I/O failure
5. Explain aloud — describe ownership/error/concurrency choices in JS terms
6. Refactor later — revisit an old project after two more phases

## Every project's gate

```sh
cargo fmt --check
cargo clippy -- -D warnings
cargo test
cargo doc --no-deps
```

Later phases add:

```sh
cargo nextest run
cargo audit
cargo criterion
```

Before calling a project done: explain every ownership decision, no unexplained `clone()`, useful errors instead of panics.

## Deploying the roadmap page

It's a static file (Tailwind/Prism/Motion loaded from CDN) — works from `file://` or any static host, GitHub Pages included.

```sh
# GitHub Pages: enable Pages on the repo (Settings → Pages), serve from root or /docs
```

Caveat: on a hosted page, `progress.js` shows whatever was last **committed**, not your live local disk — rerun the scanner and push after real progress, or hosting is just for sharing the roadmap itself, not a live tracker.
