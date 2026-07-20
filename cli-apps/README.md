# cli-apps

One folder per roadmap project: `cli-apps/<level>/<slug>/` (levels: `basic`, `intermediate`, `advanced`, `expert`).
A project counts as done when its `Cargo.toml` exists — start one with `cargo new cli-apps/basic/calculator`.

Refresh the roadmap page's progress:

```sh
cd cli-apps/tools/progress-scanner
cargo run          # rewrites progress.js at the repo root, then refresh the page
```
