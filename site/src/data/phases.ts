import type { ChatStage, Phase, RoutineStep } from '../types';

export const phases: Phase[] = [
  {level:'Basic',num:'01',title:'Rust Foundations',weeks:'2–3 weeks',summary:'Replace syntax translation with a correct ownership mental model.',concepts:['Cargo and crates','Variables and mutability','Structs and enums','Pattern matching','Option and Result','Ownership and borrowing'],js:'In JavaScript, garbage collection decides when memory is released. In Rust, ownership rules make that decision deterministic at compile time.',projects:[
    ['CLI Calculator','Parse input without relying on exceptions.','match, Result, parsing, tests','basic/calculator'],
    ['Unit Converter','Model units as enums instead of loose strings.','enums, impl blocks, traits','basic/unit-converter'],
    ['Password Generator','Use external crates and controlled randomness.','crates, strings, iterators','basic/password-generator']
  ],exit:['Explain move, copy, borrow, and mutable borrow','Use Option and Result without unwrap in normal paths','Organize a binary into modules']},
  {level:'Basic',num:'02',title:'Idiomatic Data Modeling',weeks:'3 weeks',summary:'Learn to express business rules through the type system.',concepts:['Collections','Iterators','Closures','Generics','Traits','Lifetimes basics','Serde'],js:'A TypeScript interface checks shape. A Rust trait describes shared behavior and can participate in static or dynamic dispatch.',projects:[
    ['Todo CLI','Persist structured tasks to JSON.','serde, Vec, file I/O','basic/todo'],
    ['JSON Formatter','Produce friendly parse errors and output modes.','serde_json, custom errors','basic/json-formatter'],
    ['Mini Grep','Search text with iterator pipelines.','borrowing, iterators, lifetimes','basic/mini-grep']
  ],exit:['Create generic functions with trait bounds','Know when a lifetime annotation is actually needed','Prefer iterator adapters where they improve clarity']},
  {level:'Intermediate',num:'03',title:'Filesystem & CLI Design',weeks:'2–3 weeks',summary:'Build tools that behave like real Unix-style programs.',concepts:['clap derive','Path and PathBuf','File metadata','Recursive traversal','stdin/stdout/stderr','Exit codes'],js:'Node uses process.argv and fs. Rust adds stronger path types, explicit I/O errors, and zero-cost iterators over filesystem data.',projects:[
    ['Tree Clone','Display nested directories with depth options.','recursion, PathBuf, clap','intermediate/tree'],
    ['Disk Usage','Calculate sizes safely and handle permissions.','metadata, error context','intermediate/disk-usage'],
    ['Find Clone','Combine filters, glob patterns, and output modes.','predicates, traversal, composition','intermediate/find']
  ],exit:['Design predictable commands and flags','Separate domain logic from terminal output','Handle invalid paths and permissions gracefully']},
  {level:'Intermediate',num:'04',title:'Concurrency & Shared State',weeks:'3–4 weeks',summary:'Move from single-threaded code to safe parallel execution.',concepts:['Threads','Send and Sync','Arc','Mutex and RwLock','Channels','Rayon','Atomics basics'],js:'Promise.all gives concurrency, not CPU parallelism. Rust threads and Rayon can execute CPU work in parallel while the type system prevents data races.',projects:[
    ['Parallel Copier','Copy multiple files with bounded workers.','threads, channels, Arc','intermediate/parallel-copier'],
    ['Log Analyzer','Aggregate large logs in parallel.','Rayon, HashMap, reduction','intermediate/log-analyzer'],
    ['CSV Processor','Filter and aggregate streaming records.','iterators, parallelism, generics','intermediate/csv-processor']
  ],exit:['Explain why Rc is not thread-safe and Arc is','Choose channels versus shared mutex state','Avoid holding locks during slow work']},
  {level:'Advanced',num:'05',title:'Async Rust & Networking',weeks:'4–5 weeks',summary:'Master Tokio, futures, sockets, cancellation, and backpressure.',concepts:['async/await','Future','Tokio runtime','Tasks','Async channels','TCP and HTTP','Cancellation','Backpressure'],js:'A JS Promise starts eagerly in common APIs. A Rust Future is lazy and only advances when polled by an executor.',projects:[
    ['HTTP Client','Build a curl-like client with headers and JSON.','reqwest, async errors','advanced/http-client'],
    ['Website Monitor','Check many endpoints with concurrency limits.','Semaphore, timeouts, join sets','advanced/website-monitor'],
    ['Port Scanner','Scan TCP ports responsibly with bounded tasks.','TcpStream, timeout, streams','advanced/port-scanner'],
    ['TCP Chat','Broadcast framed messages among CLI clients.','TcpListener, split, mpsc, select!','advanced/tcp-chat']
  ],exit:['Explain task versus OS thread','Apply timeouts and cancellation','Design bounded concurrency rather than spawning endlessly']},
  {level:'Advanced',num:'06',title:'Systems Programming',weeks:'4–5 weeks',summary:'Interact with processes, signals, terminals, and operating-system boundaries.',concepts:['Processes','Signals','Environment','Terminal modes','FFI awareness','Memory layout','Unsafe principles'],js:'Node wraps most operating-system behavior. Rust lets you work close to the OS while keeping unsafe code isolated behind safe APIs.',projects:[
    ['Mini Shell','Run commands, pipelines, history, and built-ins.','process, pipes, signals','advanced/mini-shell'],
    ['Process Manager','Inspect and control child processes.','PIDs, lifecycle, shutdown','advanced/process-manager'],
    ['File Watcher','React to filesystem changes and debounce events.','notify, channels, state machine','advanced/file-watcher']
  ],exit:['Distinguish child-process and thread lifecycle','Handle Ctrl+C and graceful shutdown','State the safety invariant of every unsafe block']},
  {level:'Expert',num:'07',title:'Advanced Language Features',weeks:'5–6 weeks',summary:'Use Rust abstraction tools without hiding important behavior.',concepts:['Trait objects','Associated types','Interior mutability','Declarative macros','Procedural macros','Pin and Unpin','Zero-cost abstractions'],js:'TypeScript decorators and metaprogramming run in a dynamic environment. Rust macros transform tokens at compile time and still produce statically checked code.',projects:[
    ['Redis Clone','Implement a framed protocol and expiring keys.','async server, state, protocol','expert/redis-clone'],
    ['Git Clone','Store content-addressed objects and commits.','binary formats, hashing','expert/git-clone'],
    ['SQLite-Inspired Store','Implement pages, indexes, and a tiny query parser.','B-tree concepts, parsing, storage','expert/sqlite-store']
  ],exit:['Choose static dispatch versus dyn Trait','Build one useful macro and document its limits','Understand Pin conceptually without forcing it everywhere']},
  {level:'Expert',num:'08',title:'Production Engineering',weeks:'6+ weeks',summary:'Turn Rust knowledge into maintainable, distributable software.',concepts:['Workspace architecture','thiserror and anyhow','Tracing','Configuration','Integration tests','Property tests','Benchmarks','Cross compilation','Releases'],js:'This phase resembles production Node development, but Rust pushes more correctness into compilation and makes binary distribution straightforward.',projects:[
    ['DevOps CLI','Deploy, inspect logs, execute tasks, and manage config.','architecture, async, plugins','expert/devops-cli'],
    ['Terminal Dashboard','Add a Ratatui interface over live processes.','TUI, events, state','expert/terminal-dashboard'],
    ['Package & Release','Ship signed binaries through CI for major platforms.','GitHub Actions, artifacts, semver','expert/package-release']
  ],exit:['Publish reproducible release binaries','Instrument important operations with tracing','Measure before optimizing and document tradeoffs']}
];

export const chatStages: ChatStage[] = [
  ['1','Echo server','One client sends bytes; the server writes them back.'],
  ['2','Framed messages','Use newline or length-prefix framing so reads form messages.'],
  ['3','Multi-client broadcast','Spawn a task per connection and broadcast through channels.'],
  ['4','Identity and rooms','Add usernames, join/leave events, and room membership.'],
  ['5','Reliability','Add bounded queues, timeouts, reconnect behavior, and graceful shutdown.'],
  ['6','Production TUI','Add TLS, tracing, tests, config, and a Ratatui interface.']
];

export const routines: RoutineStep[] = [
  ['1','Read narrowly','Study only the concepts needed for the next checkpoint.'],
  ['2','Build from memory','Close the tutorial and implement a small vertical slice.'],
  ['3','Fight the compiler','Read the complete diagnostic; avoid cloning merely to silence it.'],
  ['4','Test behavior','Cover happy paths, malformed input, I/O failure, and edge cases.'],
  ['5','Explain aloud','Describe ownership, error, and concurrency choices in JS terms.'],
  ['6','Refactor later','Return after two phases and improve the old project idiomatically.']
];
