use clap::{Parser, ValueEnum};

use crate::{
    computation::compute,
    operations::{addition, division, modulus, multiplication, subtraction},
};

#[derive(Clone, ValueEnum)]
pub enum Operation {
    Add,
    Subtract,
    Multiply,
    Divide,
    Mod,
}

#[derive(Parser)]
#[command(version, about, long_about = None)]
pub struct Command {
    #[arg(short, long, value_enum)]
    pub operation: Operation,
}

pub const COMMANDS: [&str; 2] = ["-q | quit (Quit)", "-t | try (Try again)"];

impl Operation {
    pub fn calculate(&self) -> Result<f64, String> {
        match self {
            Operation::Add => Ok(compute("addition", addition)),
            Operation::Subtract => Ok(compute("subtraction", subtraction)),
            Operation::Multiply => Ok(compute("multiplication", multiplication)),
            Operation::Divide => compute("division", division),
            Operation::Mod => compute("modulus", modulus),
        }
    }
}
