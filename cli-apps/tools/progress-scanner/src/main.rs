//! Progress scanner: marks a roadmap project as done when
//! cli-apps/<level>/<slug>/Cargo.toml exists, and writes progress.js
//! next to rust-cli-mastery-roadmap.html for the page to load.

use std::fs;
use std::path::{Path, PathBuf};
use std::process::{Command, ExitCode};

const LEVELS: [&str; 4] = ["basic", "intermediate", "advanced", "expert"];

fn repo_root() -> PathBuf {
    // scanner lives at <root>/cli-apps/tools/progress-scanner
    let manifest = PathBuf::from(env!("CARGO_MANIFEST_DIR"));
    manifest
        .ancestors()
        .nth(3)
        .expect("scanner must live 3 levels below the repo root")
        .to_path_buf()
}

/// Pulls the passed-count out of a `cargo test` summary line, e.g.
/// "test result: ok. 3 passed; 0 failed; ..." -> Some(3).
fn parse_passed_count(line: &str) -> Option<u32> {
    line.split("passed")
        .next()?
        .trim()
        .rsplit(' ')
        .next()?
        .parse()
        .ok()
}

/// True if `cargo test` succeeds in `project_dir` AND at least one test
/// actually ran. A commented-out `#[test]` or an empty suite makes cargo
/// exit 0 with zero tests run, which must NOT count as done — grepping
/// source for the literal string "#[test]" doesn't catch that (it also
/// matches inside comments), so this reads cargo's own result summary.
pub fn tests_pass(project_dir: &Path) -> bool {
    let Ok(output) = Command::new("cargo")
        .args(["test", "--quiet"])
        .current_dir(project_dir)
        .output()
    else {
        return false;
    };
    if !output.status.success() {
        return false;
    }
    let stdout = String::from_utf8_lossy(&output.stdout);
    stdout
        .lines()
        .filter(|l| l.starts_with("test result:"))
        .filter_map(parse_passed_count)
        .sum::<u32>()
        > 0
}

fn scan(cli_apps: &Path) -> std::io::Result<Vec<String>> {
    let mut done = Vec::new();
    for level in LEVELS {
        let level_dir = cli_apps.join(level);
        if !level_dir.is_dir() {
            continue;
        }
        for entry in fs::read_dir(&level_dir)? {
            let entry = entry?;
            let path = entry.path();
            if path.join("Cargo.toml").is_file() && tests_pass(&path) {
                done.push(format!("{level}/{}", entry.file_name().to_string_lossy()));
            }
        }
    }
    done.sort();
    Ok(done)
}

fn main() -> ExitCode {
    let root = match std::env::args().nth(1) {
        Some(arg) => PathBuf::from(arg),
        None => repo_root(),
    };

    let done = match scan(&root.join("cli-apps")) {
        Ok(done) => done,
        Err(err) => {
            eprintln!(
                "error: could not scan {}: {err}",
                root.join("cli-apps").display()
            );
            return ExitCode::FAILURE;
        }
    };

    // ponytail: hand-rolled JSON — dir names are our own kebab-case slugs, no
    // escaping needed. Switch to serde_json if keys ever get exotic.
    let entries: Vec<String> = done.iter().map(|d| format!("\"{d}\":true")).collect();
    let js = format!("window.diskProgress={{{}}};\n", entries.join(","));

    let out = root.join("progress.js");
    if let Err(err) = fs::write(&out, js) {
        eprintln!("error: could not write {}: {err}", out.display());
        return ExitCode::FAILURE;
    }

    println!(
        "{} project(s) found on disk -> {}",
        done.len(),
        out.display()
    );
    for d in &done {
        println!("  ✓ {d}");
    }
    ExitCode::SUCCESS
}

#[cfg(test)]
mod tests {
    use super::scan;
    use std::fs;

    fn cargo_toml(name: &str) -> String {
        format!("[package]\nname = \"{name}\"\nversion = \"0.1.0\"\nedition = \"2021\"\n")
    }

    #[test]
    fn finds_only_dirs_with_passing_tests() {
        let tmp = std::env::temp_dir().join("scanner-test-cli-apps");
        let _ = fs::remove_dir_all(&tmp);

        // Cargo.toml + a passing #[test] -> done.
        fs::create_dir_all(tmp.join("basic/calculator/src")).unwrap();
        fs::write(
            tmp.join("basic/calculator/Cargo.toml"),
            cargo_toml("calculator"),
        )
        .unwrap();
        fs::write(
            tmp.join("basic/calculator/src/main.rs"),
            "fn main() {}\n#[test]\nfn it_works() { assert_eq!(1 + 1, 2); }\n",
        )
        .unwrap();

        // Cargo.toml exists but no test case -> not counted as done.
        fs::create_dir_all(tmp.join("basic/no-tests/src")).unwrap();
        fs::write(
            tmp.join("basic/no-tests/Cargo.toml"),
            cargo_toml("no-tests"),
        )
        .unwrap();
        fs::write(tmp.join("basic/no-tests/src/main.rs"), "fn main() {}\n").unwrap();

        // #[test] present only in a comment -> cargo runs 0 tests -> not done.
        fs::create_dir_all(tmp.join("basic/commented-out/src")).unwrap();
        fs::write(
            tmp.join("basic/commented-out/Cargo.toml"),
            cargo_toml("commented-out"),
        )
        .unwrap();
        fs::write(
            tmp.join("basic/commented-out/src/main.rs"),
            "fn main() {}\n// #[test]\n// fn it_works() { assert_eq!(1 + 1, 2); }\n",
        )
        .unwrap();

        // Cargo.toml + a failing #[test] -> not counted as done.
        fs::create_dir_all(tmp.join("basic/failing/src")).unwrap();
        fs::write(tmp.join("basic/failing/Cargo.toml"), cargo_toml("failing")).unwrap();
        fs::write(
            tmp.join("basic/failing/src/main.rs"),
            "fn main() {}\n#[test]\nfn it_fails() { assert!(false); }\n",
        )
        .unwrap();

        fs::create_dir_all(tmp.join("basic/empty-folder")).unwrap();
        fs::create_dir_all(tmp.join("tools/progress-scanner")).unwrap();
        fs::write(
            tmp.join("tools/progress-scanner/Cargo.toml"),
            cargo_toml("progress-scanner"),
        )
        .unwrap();

        assert_eq!(scan(&tmp).unwrap(), vec!["basic/calculator".to_string()]);
        fs::remove_dir_all(&tmp).unwrap();
    }
}
