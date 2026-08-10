mod computation;
mod data;
mod operations;
mod tests;

use common::{clear_screen, readline};
use std::{println, thread, time::Duration};

use clap::Parser;

fn main() {
    let command = data::Command::parse();

    'main: loop {
        clear_screen();
        let separator = "=".repeat(20);
        println!("{} Welcome to CLI Calculator {}", separator, separator);
        match command.operation.calculate() {
            Ok(total) => println!("total: {}", total),
            Err(e) => println!("{}", e),
        }

        loop {
            let mut cta = String::new();
            println!("{}", separator);
            println!("Available commands:");
            for c in data::COMMANDS {
                println!("{}", c);
            }
            readline("Select option above: ", &mut cta);

            if ["-q", "quit"].contains(&cta.trim()) {
                println!("Thank you for trying my cli app <3");
                thread::sleep(Duration::from_secs(2));
                break 'main;
            }

            if ["-t", "try"].contains(&cta.trim()) {
                break;
            }
        }
    }
}
