mod length;
mod temperature;
mod volume;
mod weight;

use std::fmt::Display;

pub use length::Length;
pub use temperature::Temperature;
pub use volume::Volume;
pub use weight::Weight;

pub trait Unit {
    fn value_from_base(&self, value: f64) -> f64;
    fn value_to_base(&self, value: f64) -> f64;
}

// Default math for ratio-based units (single multiplier, e.g. km, cm, lb).
// Unrelated to `Unit` — units needing offset math (Celsius<->Fahrenheit) implement Unit directly.
pub trait RatioUnit {
    const FACTOR: f64; // base-units per 1 of this unit

    fn value_from_base(&self, value: f64) -> f64 {
        value / Self::FACTOR
    }

    fn value_to_base(&self, value: f64) -> f64 {
        value * Self::FACTOR
    }
}

pub trait UnitList: Display + Copy + Sized + 'static {
    const ITEMS: &'static [(&'static str, Self)];

    fn print() {
        let width = Self::ITEMS
            .iter()
            .map(|(code, _)| code.len())
            .max()
            .unwrap_or(0);
        for (code, unit) in Self::ITEMS {
            println!("{code:width$} | {unit}");
        }

        println!();
    }

    fn parse(option: &str) -> Result<Self, String> {
        let option = option.trim().to_lowercase();
        Self::ITEMS
            .iter()
            .find(|(code, unit)| [*code, &unit.to_string()].contains(&option.as_str()))
            .map(|(_, unit)| *unit)
            .ok_or_else(|| String::from("Please select only that is listed!"))
    }
}
