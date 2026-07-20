//! Progress scanner: marks a roadmap project as done when
//! cli-apps/<level>/<slug>/Cargo.toml exists, and writes progress.js
//! next to rust-cli-mastery-roadmap.html for the page to load.

use std::fs;
use std::path::{Path, PathBuf};
use std::process::ExitCode;

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

fn scan(cli_apps: &Path) -> std::io::Result<Vec<String>> {
    let mut done = Vec::new();
    for level in LEVELS {
        let level_dir = cli_apps.join(level);
        if !level_dir.is_dir() {
            continue;
        }
        for entry in fs::read_dir(&level_dir)? {
            let entry = entry?;
            if entry.path().join("Cargo.toml").is_file() {
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

    #[test]
    fn finds_only_dirs_with_cargo_toml() {
        let tmp = std::env::temp_dir().join("scanner-test-cli-apps");
        let _ = fs::remove_dir_all(&tmp);
        fs::create_dir_all(tmp.join("basic/calculator")).unwrap();
        fs::write(tmp.join("basic/calculator/Cargo.toml"), "[package]").unwrap();
        fs::create_dir_all(tmp.join("basic/empty-folder")).unwrap();
        fs::create_dir_all(tmp.join("tools/progress-scanner")).unwrap();
        fs::write(tmp.join("tools/progress-scanner/Cargo.toml"), "[package]").unwrap();

        assert_eq!(scan(&tmp).unwrap(), vec!["basic/calculator".to_string()]);
        fs::remove_dir_all(&tmp).unwrap();
    }
}
