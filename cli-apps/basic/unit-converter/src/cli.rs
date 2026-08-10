use clap::{Parser, ValueEnum};

use common::{clear_screen, readline};

use crate::units::{Length, Temperature, Unit as UnitValue, UnitList, Volume, Weight};
use std::fmt::Display;
use std::str::FromStr;

use std::{thread, time::Duration};

pub const COMMANDS: [&str; 2] = ["-q | quit (Quit)", "-t | try (Try again)"];

#[derive(Clone, ValueEnum)]
pub enum Unit {
    Length,
    Weight,
    Temperature,
    Volume,
}

#[derive(Parser)]
#[command(version, about, long_about = None)]
struct Command {
    #[arg[short, long, value_enum]]
    unit: Unit,
}

impl Unit {
    fn start(self) {
        match self {
            Unit::Length => init::<Length>(),
            Unit::Volume => init::<Volume>(),
            Unit::Weight => init::<Weight>(),
            Unit::Temperature => init::<Temperature>(),
        }
    }
}

pub fn start() {
    let command = Command::parse();
    clear_screen();
    let separator = "=".repeat(20);
    println!("{separator} Length unit conversion {separator}");

    command.unit.start();
}

fn convert<T>(value: f64, from: T, to: T) -> f64
where
    T: UnitValue + Clone,
{
    let base_value = from.value_from_base(value);
    to.value_to_base(base_value)
}

pub fn init<T>()
where
    T: UnitList + FromStr + UnitValue + Display,
{
    'app: loop {
        T::print();
        let unit_from = loop {
            let mut unit = String::new();
            readline("Unit from: ", &mut unit);

            match T::from_str(&unit) {
                Ok(unit) => break unit,
                Err(_) => {
                    println!("Invalid option!");
                    continue;
                }
            }
        };

        let value: f64 = loop {
            let mut unit_value = String::new();
            readline(format!("{}: ", unit_from).as_str(), &mut unit_value);

            match unit_value.trim().parse::<f64>() {
                Ok(num) => break num,
                Err(_) => {
                    println!("Please enter a number!");
                    continue;
                }
            }
        };

        let unit_to = loop {
            let mut unit = String::new();
            readline("Unit to: ", &mut unit);
            match T::from_str(&unit) {
                Ok(unit) => break unit,
                Err(_) => {
                    println!("Invalid option!");
                    continue;
                }
            }
        };

        let result = convert(value, unit_from, unit_to);
        println!("{}: {} = {}: {}", unit_from, value, unit_to, result);

        loop {
            let mut command = String::new();
            let separator = "=".repeat(20);
            println!("{}", separator);
            for c in COMMANDS.iter() {
                eprintln!("{c}");
            }

            readline("Please select an option above: ", &mut command);
            let command = &command.trim();
            if ["-t", "try"].contains(command) {
                clear_screen();
                continue 'app;
            }
            if ["-q", "quit"].contains(command) {
                println!("Thank you for trying my cli app <3");
                thread::sleep(Duration::from_secs(2));
                break 'app;
            }
            println!("invalid option!");
        }
    }
}
